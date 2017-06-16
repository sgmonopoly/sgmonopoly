'use strict';

const sg_constant = require("../../services/sg_constant");
const allRoom = require("../../services/share_variables").allRoom;
const SG_Game = require("../../models/sg_game");
const _ = require("lodash");
const common = require("../../services/common_roomUtils");

const init = (socket, io, roomNumber, wsUtils) => {

    /**
     * 房间对象
     */
    let room = allRoom[roomNumber - 1];
    let roomUsers = room.users;//array

    /**
     * 当前对局的游戏属性
     */
    let currentGameInfo;

    /**
     * 开始游戏
     */
    socket.on('startGame', () => {
        //检查当前房间所有人是否都准备好了
        if (!checkAllReady(roomUsers)) {
            return wsUtils.alertLog("有人未准备!");
        }
        //初始化游戏
        initGame();

        //io.emit("startGameSuccess", roomUsers);
        wsUtils.gameLog("游戏开始了");
        wsUtils.updateRoomToAll(room);
        nextTurn();
    });

    /**
     * 本轮结束
     */
    socket.on('endTurn', () => {
        wsUtils.gameLog(socket.nickname + "结束了当前回合");
        wsUtils.updateRoomToAll(room);
        currentGameInfo = room.gameInfo;//解决游戏信息无故消失的BUG
        nextTurn();
    });
    /**
     * @deprecated 由于会有数值计算的事务问题,这个方法暂时不用
     *
     * 调整数值,完全由前端控制
     * 【
     *    {
     *      userId:1,//用户ID
     *      money:-1000,//钱少了1000
     *      troop:2000,//兵力增加2000
     *      addCitys:[1],//拥有城市1
     *      removeCitys:[2,3],//失去城市2和3
     *      upgradeCitys:[{cityId:31,up:-1}],//城市31降级(大变小,小变无)
     *      addCards:[10,20],//增加卡片
     *      removeCards:[11],//失去卡片
     *      addSuggestions:[10,20],//增加锦囊
     *      removeSuggestions:[11],//失去锦囊
     *      suspended:1//停一次
     *    },
     *    {
     *      userId:2,//用户ID
     *      suspended:-1//解除停留一次
     *    }
     *  ]
     */
    socket.on('changeData', (data) => {
        if (!data) {
            return wsUtils.errorLog("data参数为空");
        }
        if (!common.checkValidUser(roomUsers, socket.id)) {
            console.log(socket.id, "当前客户端非游戏玩家!");
            return wsUtils.errorLogAll("检测到有玩家在作弊!");
        }
        console.log("changeData:", data);
        data.forEach(changeData => {
            const user = common.getUser(roomUsers, changeData["userId"]);
            if (user) {
                changeDataNumber(changeData, "money", user, "money");
                changeDataNumber(changeData, "troop", user, "troop");
                changeDataArray(changeData, "addCitys", "removeCitys", user, "citys");
                //TODO upgradeCitys不在这里做,在sg_game类里面做了
                changeDataArray(changeData, "addCards", "removeCards", user, "cards");
                changeDataArray(changeData, "addSuggestions", "removeSuggestions", user, "suggestions");
                changeDataNumber(changeData, "suspended", user, "suspended");
            }
        });

        wsUtils.updateRoomToAll(room);
    });

    /**
     * 掷骰子走路,并广播骰子点数
     * 可以前端直接传,不传的话就后端随机生成
     */
    socket.on('throwDiceForWalk', (point) => {
        if (!point) point = getDicePoint(currentGameInfo.diceRange);
        console.log("throwDice", point);

        wsUtils.gameLog(socket.nickname + "投掷点数:" + point);

        const currentUser = getUser(socket.userId);
        //返回途径的所有节点
        const midway = getMidway(currentUser.currentPosition, point);

        currentUser.currentPosition = midway[midway.length - 1];

        io.emit('diceResultForWalk', {
            userId: socket.userId,
            nickname: socket.nickname,
            point: point,
            midway: midway,
            offset: currentUser.offset,
            userInfo: {
                userId: currentUser.userId,
                money: currentUser.money
            }//20170614 返回用户对象给targetPositionFeedback用
        });

    });

    /**
     * 买空城
     */
    socket.on('buyCity', stageId => {
        if (!stageId) {
            return wsUtils.errorLog("stageId参数为空");
        }
        const city = currentGameInfo.getCity(stageId);
        if (!city) {
            return wsUtils.errorLog("城市找不到" + stageId);
        }
        if (city.ownerId) {
            return wsUtils.alertLog(city.stageName + "不是空城");
        }
        const user = getUser(socket.userId);
        if (user.money < city.occupyPrice) {
            return wsUtils.alertLog("当前用户" + user.nickname + "买不起" + city.stageName);
        }

        user.money = user.money - city.occupyPrice;//付钱
        currentGameInfo.occupyCity(user, city);//占领城市
        wsUtils.updateRoomToAll(room);
    });

    /**
     * 付过路费
     */
    socket.on('payToll', stageId => {
        if (!stageId) {
            return wsUtils.errorLog("stageId参数为空");
        }
        const city = currentGameInfo.getCity(stageId);
        if (!city) {
            return wsUtils.errorLog("城市找不到" + stageId);
        }
        if (city.stageType != sg_constant.stage_type.city) {
            return wsUtils.alertLog("当前地点并非城市" + stageId);
        }
        if (!city.ownerId) {
            return wsUtils.gameLog(city.stageName + "是空城,不需要付费");
        }
        const currentUser = getUser(socket.userId);
        if (city.ownerId === socket.userId) {
            return wsUtils.gameLog(`${city.stageName}是${currentUser.nickname}自己的,不需要付费`);
        }

        const targetUser = getUser(city.ownerId);
        let toll = city.toll;
        if (currentUser.money < city.toll) {
            toll = currentUser.money;//钱不够,则全交
        }
        currentUser.money = currentUser.money - toll;
        targetUser.money = targetUser.money + toll;

        wsUtils.gameLog(`${currentUser.nickname}路过${city.stageName}付过路税金${toll}给${targetUser.nickname}`);
        wsUtils.updateRoomToAll(room);
    });

    /**
     * 购买兵力
     */
    socket.on('payTroop', (troop = 0) => {
        if (!_.isNumber(troop)) {
            troop = parseInt(troop);
        }
        const currentUser = getUser(socket.userId);
        if (currentUser.money < troop) {
            //1兵力=1两钱,所以钱不够时,不准买
            return wsUtils.alertLog(currentUser.nickname + "金钱不足以购买兵力" + troop);
        }
        currentUser.money = currentUser.money - troop;
        currentUser.troop = currentUser.troop + troop;

        wsUtils.gameLog(`${currentUser.nickname}购买了兵力${troop}`);
        wsUtils.updateRoomToAll(room);
        wsUtils.eventOver(sg_constant.stage_type.conscription);
    });

    /**
     * 购买武将
     */
    socket.on('payHero', (num = 1) => {
        if (!_.isNumber(num)) {
            num = parseInt(num);
        }
        const currentUser = getUser(socket.userId);
        const needMoney = num * 1000;
        if (currentUser.money < needMoney) {
            return wsUtils.alertLog(currentUser.nickname + "金钱不足以购买武将");
        }
        if (currentGameInfo.cardOrders.length < num) {
            return wsUtils.alertLog("国库中已经少于" + num + "张卡片了");
        }

        currentUser.money = currentUser.money - needMoney;
        _.times(num, function () {
            const cardId = getNextCardIndex();
            if(cardId){
                currentUser.cards.push(cardId);
            }
        });

        wsUtils.gameLog(`${currentUser.nickname}购买了${num}名武将卡`);
        wsUtils.updateRoomToAll(room);
        wsUtils.eventOver(sg_constant.stage_type.draft);
    });

    /**
     * 游乐园停一次,交500
     */
    socket.on('inPark', () => {
        const currentUser = getUser(socket.userId);
        currentUser.suspended = currentUser.suspended + 1;
        let payMoney = 500;
        if (currentUser.money < payMoney) {
            payMoney = currentUser.money;
            currentUser.money = 0;
        } else {
            currentUser.money = currentUser.money - payMoney;
        }

        wsUtils.gameLog(`${currentUser.nickname}进入游乐园交游玩费${payMoney}两, 并暂停一轮`);
        wsUtils.updateRoomToAll(room);
        wsUtils.eventOver(sg_constant.stage_type.park);
    });

    /**
     * 按摩院停一次,交800
     */
    socket.on('inMassage', () => {
        const currentUser = getUser(socket.userId);
        currentUser.suspended = currentUser.suspended + 1;
        let payMoney = 800;
        if (currentUser.money < payMoney) {
            payMoney = currentUser.money;
            currentUser.money = 0;
        } else {
            currentUser.money = currentUser.money - payMoney;
        }

        wsUtils.gameLog(`${currentUser.nickname}进入按摩院交费${payMoney}两, 并暂停一轮`);
        wsUtils.updateRoomToAll(room);
        wsUtils.eventOver(sg_constant.stage_type.massage);
    });

    /**
     * 缴税,交500
     */
    socket.on('inTax', () => {
        const currentUser = getUser(socket.userId);
        let payMoney = 500;
        if (currentUser.money < payMoney) {
            payMoney = currentUser.money;
            currentUser.money = 0;
        } else {
            currentUser.money = currentUser.money - payMoney;
        }

        wsUtils.gameLog(`${currentUser.nickname}向国库缴费${payMoney}两`);
        wsUtils.updateRoomToAll(room);
        wsUtils.eventOver(sg_constant.stage_type.tax);
    });

    /**
     * 茅庐,累加3次骰子,根据结果送武将
     */
    socket.on('inCottage', () => {
        const currentUser = getUser(socket.userId);
        const point1 = getDicePoint(currentGameInfo.diceRange);
        const point2 = getDicePoint(currentGameInfo.diceRange);
        const point3 = getDicePoint(currentGameInfo.diceRange);
        const pointAll = point1 + point2 + point3;

        let heroCount = 0;
        if(pointAll > 15 ){
            heroCount = 3;
        }else if(pointAll > 12){
            heroCount = 2;
        }else if(pointAll > 9){
            heroCount = 1;
        }

        _.times(heroCount, function () {
            const cardId = getNextCardIndex();
            if(cardId){
                currentUser.cards.push(cardId);
            }
        });

        wsUtils.gameLog(`${socket.nickname}投掷3次分别为:${point1}点、${point2}点和${point3}点,总点数${pointAll}点,得武将${heroCount}名`);
        wsUtils.updateRoomToAll(room);
        wsUtils.eventOver(sg_constant.stage_type.cottage);
    });

    /**
     * 改造城市,包括升级或者降级,可指定任意城市
     * ifPay 为是否付钱,区别于锦囊妙计的非付费升级
     */
    socket.on('upgradeCity', (stageId, ifPay = true, level = 1) => {
        if (!stageId) {
            return wsUtils.errorLog("stageId参数为空");
        }
        const city = currentGameInfo.getCity(stageId);
        if (!city) {
            return wsUtils.errorLog("城市找不到" + stageId);
        }
        if (!city.ownerId) {
            return wsUtils.alertLog("城市未占领,无法改造" + stageId);
        }
        if (city.ownerId != socket.userId) {
            return wsUtils.alertLog(`城市的占领者并非自己,占领者${city.ownerId},自己${socket.userId}`);
        }
        if (city.stageType != sg_constant.stage_type.city) {
            return wsUtils.alertLog("当前地点并非城市" + stageId);
        }
        if (city.colorFollow === sg_constant.city_follow.ancient) {
            return wsUtils.alertLog("古战场不能改造" + stageId);
        }
        //先算出要改造多少级别的城市
        const targetLevel = rebuildAndGetLevelMade(city, level);
        const levelMade = targetLevel - city.cityType;//用差值来判断升级了多少
        if (levelMade <= 0) {//城市如果没有任何变化,返回报错
            return wsUtils.alertLog("城市无法改造" + stageId);
        }
        const cityUser = getUser(city.ownerId);
        //根据改造的结果,付钱,
        if (ifPay) {
            const rebuildMoney = levelMade * city.buildPrice;
            if (cityUser.money < rebuildMoney) {
                return wsUtils.alertLog(cityUser.nickname + "金钱不足以改造城市");
            }
            cityUser.money = cityUser.money - rebuildMoney;
        }

        //真正开始升级
        //升级1次,或者2次
        _.times(levelMade, function () {
            currentGameInfo.upgradeCity(cityUser, city);
        });

        wsUtils.gameLog(`${city.stageName}改造成了${sg_constant.city_type_cn[levelMade]}`);
        wsUtils.updateRoomToAll(room);
    });

    /////////////////////////////////////////////

    /**
     * 初始化游戏
     */
    const initGame = () => {
        currentGameInfo = new SG_Game();

        room.gameInfo = currentGameInfo;//将游戏属性设置到房间属性中

        let lord = _.shuffle(sg_constant.lord_id_array);
        const selectedLords = [];
        let userIndex = 0;
        //初始化君主
        roomUsers.forEach(user => {
            //FIXME 暂时用随机分配君主(ID 1 14 27 40),将来做成可以选的
            const lordId = lord.shift();
            user.cards.push(lordId);
            user.lordName = sg_constant.lord_property[lordId].name;
            user.lordAvatar = sg_constant.lord_property[lordId].avatar;
            user.offset = userIndex++ * sg_constant.avatar_offset;//偏移量暂时设置为20
            selectedLords.push(lordId);
        });
        //去掉选择掉的君主
        currentGameInfo.cardOrders = _.difference(currentGameInfo.cardOrders, selectedLords);

        roomUsers.forEach(user => {
            //金钱和兵力早已初始化过了,这里只摸3张武将卡
            _.times(3, () => {
                const cardId = getNextCardIndex();
                if(cardId){
                    user.cards.push(cardId);
                }
            });
            //将所有人置为开始游戏状态
            user.status = sg_constant.user_status.gaming;
        });
        room.isGaming = true;
    };
    /**
     * 为下一回合发送消息
     */
    const nextTurn = () => {
        try {
            const nextUser = getNextUser();
            nextUser.turn = nextUser.turn + 1;//总轮数+1
            wsUtils.gameLog("当前回合用户:" + nextUser);
            /*
             为了防止某些用户掉线,而造成这个数值的不正确
             这里判断每个人的总轮数,取最大值作为游戏的总轮数值
             */
            if (currentGameInfo.turn < nextUser.turn) {
                currentGameInfo.turn = nextUser.turn;
            }

            //判断用户是否暂停,如是则再调用一次该方法
            if(nextUser.suspended > 0){
                nextUser.suspended = nextUser.suspended - 1;
                wsUtils.gameLog(`${nextUser.nickname}暂停一轮`);
                nextTurn();
            }

            io.emit("nextTurn", nextUser);//这里传整个用户对象,是因为可能会有个用户信息前后端不同步的BUG
        } catch (e) {
            console.error(e);
            //TODO
        }
    };

    /**
     * 获取下一回合的用户,跳过掉线的用户
     * @returns {T|*}
     */
    let safeCount = 0;
    const getNextUser = () => {
        console.log("getNextUser");
        //先获取下一个用户索引
        changeNextUserIndex();
        safeCount++;
        if (safeCount > 10) {
            //安全监测,以防万一,如果永远取不到下一个用户直接暂停报错
            //TODO 调用游戏结束方法
            endGame();
            throw new Error("房间无人在线!");
        }
        let nextUser = roomUsers[currentGameInfo.currentUserIndex];
        //判断该用户是否在线
        if (nextUser && nextUser.status === sg_constant.user_status.gaming) {
            safeCount = 0;
            return nextUser;
        } else {
            //不在线则再调一次
            getNextUser();
        }
    };

    /**
     * 获取下一个用户索引
     */
    const changeNextUserIndex = () => {
        //console.log("changeNextUserIndex",currentGameInfo);
        if (currentGameInfo.currentUserIndex >= roomUsers.length - 1) {
            //如果当前用户索引大于等于长度时,重置
            currentGameInfo.currentUserIndex = 0;
        } else {
            currentGameInfo.currentUserIndex = currentGameInfo.currentUserIndex + 1;
        }
    };

    /**
     * 获取下一张牌,没有则返回false
     * @returns {T|*}
     */
    const getNextCardIndex = () => {
        if (currentGameInfo.cardOrders.length === 0) {
            wsUtils.gameLog("国库无剩余武将了!");
            return false;
        }
        return currentGameInfo.cardOrders.shift();
    };

    /**
     * 升级或者降级城市,并且返回升级的结果
     * @param city
     * @param level
     * @returns {number}
     */
    const rebuildAndGetLevelMade = (city, level) => {
        //最多改造2级
        if (level > 2) {
            level = 2;
        } else if (level < -2) {
            level = -2;
        }
        //城市最小为普通城1,最大为大城3
        let targetLevel = city.cityType + level;
        if (targetLevel > 3) {
            targetLevel = 3;
        } else if (targetLevel < 1) {
            targetLevel = 1;
        }

        return targetLevel;
    };

    /**
     * 交还武将卡给国库,并重新洗牌
     * @param cardId
     * @returns {T|*}
     */
    const returnCardToHome = (cardId) => {
        currentGameInfo.cardOrders.push(cardId);
        let tempCards = currentGameInfo.cardOrders;
        currentGameInfo.cardOrders = _.shuffle(tempCards);
    };
    /**
     * 获取下一张紧急军情,没有则重新洗牌
     * @returns {T|*}
     */
    const getNextSituationIndex = () => {
        if (currentGameInfo.situationOrders.length === 0) {
            currentGameInfo.situationOrders = common.createShuffledArray(sg_constant.item_count.situation);
        }
        return currentGameInfo.situationOrders.shift();
    };
    /**
     * 获取下一张锦囊妙计,没有则重新洗牌
     * @returns {T|*}
     */
    const getNextSuggestionIndex = () => {
        if (currentGameInfo.suggestionOrder.length === 0) {
            currentGameInfo.suggestionOrder = common.createShuffledArray(sg_constant.item_count.suggestion);
        }
        return currentGameInfo.suggestionOrder.shift();
    };

    /**
     * 获取房间内用户
     * @param userId
     */
    const getUser = (userId) => {
        return common.getUser(roomUsers, userId);
    };
    /**
     * 结束游戏
     */
    const endGame = () => {
        console.log(`房间${room.roomNo}游戏结束`);
        currentGameInfo = {};
        room.users.length = 0;
        room.hostId = room.hostNickname = "";
        room.currentNum = 0;
        room.isGaming = false;

        io.emit("gameover");
    };


    socket.on('disconnect', () => {
        //TODO
        //自动调用下一个回合
        //nextTurn();
    });
};

/**
 * 检查当前房间所有人是否都准备好了
 * @param roomUsers
 */
const checkAllReady = (roomUsers) => {
    for (let i = 0; i < roomUsers.length; i++) {
        if (sg_constant.user_status.ready !== roomUsers[i].status) {
            return false;
        }
    }
    return true;
};

/**
 * @deprecated
 * 修改所有用户的状态
 * @param roomUsers
 * @param status
 */
const modifyAllUserStatus = (roomUsers, status) => {
    for (let i = 0; i < roomUsers.length; i++) {
        roomUsers[i].status = status;
    }
};

/**
 * @deprecated
 * 过滤变换的数据
 * @param changeData
 * @param key
 * @param user
 * @param userkey
 */
const changeDataNumber = (changeData, key, user, userkey) => {
    if (_.isNumber(changeData[key])) {
        const adjustValue = changeData[key];
        if (adjustValue < 0 && Math.abs(adjustValue) > user[userkey]) {
            //如果是负数,且绝对值大于原来的数值,则将原来的值清零
            user[userkey] = 0;
        } else {
            user[userkey] = user[userkey] + adjustValue;
        }
    }
};
/**
 * @deprecated
 * 用户的属性
 * 过滤变换的数据
 * @param changeData
 * @param addKey
 * @param removeKey
 * @param user
 * @param userkey
 */
const changeDataArray = (changeData, addKey, removeKey, user, userkey) => {
    if (_.isArray(changeData[addKey])) {//添加
        const newArray = user[userkey].concat(changeData[addKey]);
        user[userkey] = _.uniq(newArray, true);//去重排序
    }
    if (_.isArray(changeData[removeKey])) {//移除
        const newArray = _.difference(user[userkey], changeData[removeKey]);
        user[userkey] = _.uniq(newArray, true);
    }
};
/**
 * 随机获取骰子点数
 * @param diceRange
 * @returns {*}
 */
const getDicePoint = (diceRange) => {
    const ranIndex = _.random(0, diceRange.length - 1);
    return diceRange[ranIndex];
};

/**
 * 根据走路的点数,返回包含起始位置的途径位置数据
 * @param origin
 * @param point
 * @returns {*}
 */
const getMidway = (origin, point) => {
    const midway = [];
    midway.push(origin);
    _.times(point, i => {
        const target = i + 1;
        //超过最后一处,则返回起点
        if (origin + target > sg_constant.stageCount) {
            midway.push(origin + target - sg_constant.stageCount);
        } else {
            midway.push(origin + target);
        }
    });
    return midway;
};

module.exports = init;