'use strict';

const sg_constant = require("../../services/sg_constant");
const allRoom = require("../../services/share_variables").allRoom;
const SG_Game = require("../../models/sg_game");
const _ = require("lodash");
const common = require("../../services/common_roomUtils");
const battle_service = require("../../services/battle_service");
const situation_info = require("../../models/situation_info");

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
        wsUtils.gameLog(socket.fullName + "结束了当前回合");
        wsUtils.updateRoomToAll(room);
        currentGameInfo = room.gameInfo;//解决游戏信息无故消失的BUG
        nextTurn();
    });

    /**
     * 掷骰子走路,并广播骰子点数
     * 可以前端直接传,不传的话就后端随机生成
     */
    socket.on('throwDiceForWalk', (point) => {
        currentGameInfo = room.gameInfo;//解决游戏信息无故消失的BUG
        if (!point) point = getDicePoint(currentGameInfo.diceRange);
        console.log("throwDice", point);
        const currentUser = getUser(socket.userId);
        if (!socket.fullName) {
            socket.fullName = currentUser.name;
        }
        wsUtils.gameLog(socket.fullName + "投掷点数:" + point);
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
     * 进入城市,返回城市主人ID,用于给前端判断逻辑
     */
    socket.on('inCity', stageId => {
        if (!stageId) {
            return wsUtils.errorLog("stageId参数为空");
        }
        const city = currentGameInfo.getCity(stageId);
        if (!city) {
            return wsUtils.errorLog("城市找不到" + stageId);
        }
        let ownerName;
        if (city.ownerId) {
            const owner = getUser(city.ownerId);
            ownerName = owner.name;
        }
        return socket.emit("cityOwnerId", stageId, city.stageName, city.ownerId, ownerName, city.toll);
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
            return wsUtils.alertLog("当前用户" + user.name + "买不起" + city.stageName);
        }

        user.money = user.money - city.occupyPrice;//付钱
        currentGameInfo.occupyCity(user, city);//占领城市

        wsUtils.eventOver("buyCityOver");
        wsUtils.gameLog(`${user.name}购买了空城${city.stageName}`);
        wsUtils.updateRoomToAll(room);
    });

    const payToll = stageId => {
        if (!stageId) {
            return wsUtils.errorLog("stageId参数为空");
        }
        const city = currentGameInfo.getCity(stageId);
        if (!city) {
            return wsUtils.errorLog("城市找不到" + stageId);
        }
        if (city.stageType != sg_constant.stage_type.city) {
            return wsUtils.errorLog("当前地点并非城市" + stageId);
        }
        if (!city.ownerId) {
            return wsUtils.gameLog(city.stageName + "是空城,不需要付费");
        }
        const currentUser = getUser(socket.userId);
        if (city.ownerId === socket.userId) {
            return wsUtils.gameLog(`${city.stageName}是${currentUser.name}自己的,不需要付费`);
        }

        const targetUser = getUser(city.ownerId);
        let toll = city.toll;
        if (currentUser.money < city.toll) {
            toll = currentUser.money;//钱不够,则全交
        }
        currentUser.money = currentUser.money - toll;
        targetUser.money = targetUser.money + toll;

        wsUtils.eventOver("payTollOver");
        wsUtils.gameLog(`${currentUser.name}路过${city.stageName}付过路税金${toll}给${targetUser.name}`);
        wsUtils.updateRoomToAll(room);
    };
    /**
     * 付过路费
     */
    socket.on('payToll', payToll);

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
                return wsUtils.alertLog(cityUser.name + "金钱不足以改造城市");
            }
            cityUser.money = cityUser.money - rebuildMoney;
        }

        //真正开始升级
        //升级1次,或者2次
        _.times(levelMade, function () {
            currentGameInfo.upgradeCity(cityUser, city);
        });

        wsUtils.eventOver("upgradeCityOver");
        wsUtils.gameLog(`${city.stageName}改造成了${sg_constant.city_type_cn[levelMade]}`);
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
            return wsUtils.alertLog(currentUser.name + "金钱不足以购买兵力" + troop);
        }
        currentUser.money = currentUser.money - troop;
        currentUser.troop = currentUser.troop + troop;

        wsUtils.gameLog(`${currentUser.name}购买了兵力${troop}`);
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
            return wsUtils.alertLog(currentUser.name + "金钱不足以购买武将");
        }
        if (currentGameInfo.herosOrders.length < num) {
            return wsUtils.alertLog("国库中已经少于" + num + "武将了");
        }

        currentUser.money = currentUser.money - needMoney;
        const messages = [];
        _.times(num, function () {
            const cardId = getNextCardIndex();
            if (cardId) {
                currentUser.heros.push(cardId);
                const hero = common.getHero(cardId);
                messages.push(`你购买了武将:${hero.heroName}`);
            }
        });

        wsUtils.gameLog(`${currentUser.name}购买了${num}名武将卡`);
        common.addGameLog(socket, messages);
        wsUtils.updateRoomToAll(room);
        wsUtils.eventOver(sg_constant.stage_type.draft);
    });

    /**
     * 游乐园停一次,交500
     */
    socket.on('inPark', () => {
        const currentUser = getUser(socket.userId);
        currentUser.suspended = currentUser.suspended + 1;
        let money = 500;
        money = payMoney(currentUser, money);

        wsUtils.gameLog(`${currentUser.name}进入游乐园交游玩费${money}两, 并暂停一轮`);
        wsUtils.updateRoomToAll(room);
        wsUtils.eventOver(sg_constant.stage_type.park);
    });

    /**
     * 按摩院停一次,交800
     */
    socket.on('inMassage', () => {
        const currentUser = getUser(socket.userId);
        currentUser.suspended = currentUser.suspended + 1;
        let money = 800;
        money = payMoney(currentUser, money);

        wsUtils.gameLog(`${currentUser.name}进入按摩院交费${money}两, 并暂停一轮`);
        wsUtils.updateRoomToAll(room);
        wsUtils.eventOver(sg_constant.stage_type.massage);
    });

    /**
     * 缴税,交500
     */
    socket.on('inTax', () => {
        const currentUser = getUser(socket.userId);
        let money = 500;
        money = payMoney(currentUser, money);

        wsUtils.gameLog(`${currentUser.name}向国库缴费${money}两`);
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
        if (pointAll > 15) {
            heroCount = 3;
        } else if (pointAll > 12) {
            heroCount = 2;
        } else if (pointAll > 9) {
            heroCount = 1;
        }

        _.times(heroCount, function () {
            const cardId = getNextCardIndex();
            if (cardId) {
                currentUser.heros.push(cardId);
            }
        });

        wsUtils.gameLog(`${socket.fullName}投掷3次分别为:${point1}点、${point2}点和${point3}点,总点数${pointAll}点,得武将${heroCount}名`);
        wsUtils.updateRoomToAll(room);
        wsUtils.eventOver(sg_constant.stage_type.cottage);
    });

    /**
     * 金银岛
     */
    socket.on('inIsland', () => {
        const currentUser = getUser(socket.userId);
        const point = getDicePoint(currentGameInfo.diceRange);
        const gainMoney = point * 1000;
        currentUser.money = currentUser.money + gainMoney;

        wsUtils.gameLog(`${currentUser.name}在金银岛投掷点数为${point}点,获${gainMoney}两`);
        wsUtils.updateRoomToAll(room);
        wsUtils.eventOver(sg_constant.stage_type.island);
    });

    /**
     * 进入赌馆
     */
    socket.on('inBet', () => {
        const currentUser = getUser(socket.userId);
        let money = 500;
        money = payMoney(currentUser, money);

        wsUtils.gameLog(`${currentUser.name}进入赌馆,收入场费${money}两`);
        wsUtils.updateRoomToAll(room);
    });

    /**
     * 赌博
     */
    socket.on('bet', (money) => {
        if (!money) {
            return wsUtils.alertLog("未填写赌博的数目!");
        }
        money = parseInt(money);
        const currentUser = getUser(socket.userId);
        if (money > 10000) {
            return wsUtils.alertLog("最大赌资10000!");
        }
        if (money > currentUser.money) {
            return wsUtils.alertLog("赌资超过已有的数目!");
        }

        const point = getDicePoint([1, 2, 3]);
        switch (point) {
            case 1://win
                currentUser.money += money;
                wsUtils.gameLog(`${currentUser.name}赌博赢了${money}两`);
                break;
            case 2://draw
                wsUtils.gameLog(`${currentUser.name}赌博未分胜负`);
                break;
            case 3://lose
                currentUser.money -= money;
                wsUtils.gameLog(`${currentUser.name}赌博输了${money}两`);
                break;

        }
        wsUtils.updateRoomToAll(room);
        wsUtils.eventOver(sg_constant.stage_type.bet);
    });

    /**
     * 在起点
     */
    socket.on('inStart', () => {
        const currentUser = getUser(socket.userId);
        currentUser.money = currentUser.money + 4000;

        wsUtils.gameLog(`${currentUser.name}停留在起点,获4000两`);
        wsUtils.updateRoomToAll(room);
        wsUtils.eventOver(sg_constant.stage_type.start);
    });

    /**
     * 从起点路过
     */
    socket.on('passByStart', () => {
        const currentUser = getUser(socket.userId);
        currentUser.money = currentUser.money + 2000;

        wsUtils.gameLog(`${currentUser.name}经过起点,获2000两`);
        wsUtils.updateRoomToAll(room);
    });

    /**
     * 紧急军情
     */
    socket.on('inSituation', (index) => {
        let situationIndex;
        if (!index) {
            //前端可以控制索引
            situationIndex = getNextSituationIndex();
        } else {
            situationIndex = index;
        }
        console.log("紧急军情第几个", situationIndex);
        const situation = situation_info[situationIndex];

        if(situation){
            /**
             * 调用对应的回调
             */
            situation.execute(
                {
                    myId: socket.userId,
                    targetId: "",
                    roomUsers,
                    gameInfo: currentGameInfo,
                    io,
                    socket
                }
            );
        }else{
            wsUtils.errorLog("无此紧急军情", situationIndex);
        }


        //wsUtils.gameLog(`${currentUser.name}经过起点,获2000两`);
        wsUtils.eventOver(sg_constant.stage_type.situation);
        wsUtils.updateRoomToAll(room);
    });

    socket.on('inSuggestion', (index) => {

        wsUtils.eventOver(sg_constant.stage_type.suggestion);
        wsUtils.updateRoomToAll(room);
    });

    /**
     * 攻城准备
     */
    socket.on('readyForBattle', (stageId) => {
        /**
         * 判断基本信息
         */
        if (!stageId) {
            return wsUtils.errorLog("stageId参数为空 .");
        }
        const city = currentGameInfo.getCity(stageId);
        if (!city) {
            return wsUtils.errorLog("城市找不到" + stageId);
        }
        let defUser;
        if (city.ownerId) {
            defUser = getUser(city.ownerId);
        } else {
            return wsUtils.alertLog(city.name + "是空城");
        }
        const atkUser = getUser(socket.userId);

        /**
         * 判断武将是否至少有一名
         * 应该不会出现这种情况,这里只是以防万一
         */
        if (atkUser.heros.length === 0) {
            return wsUtils.alertLog("攻方至少要有一名武将");
        }
        if (defUser.heros.length === 0) {
            return wsUtils.alertLog("守方至少要有一名武将");
        }

        /**
         * 判断兵力是否足够
         */
        const {colorFollow, cityType, stageName} = city;

        let atkTroop;//需要的兵力
        let defTroop;
        let atkConsumeTroop;//消耗的兵力
        let defConsumeTroop = 500;
        let message;
        let troopScale;
        if (colorFollow !== sg_constant.city_follow.ancient) {
            troopScale = cityType;
            atkTroop = troopScale * 1500;
            defTroop = troopScale * 500;
            atkConsumeTroop = troopScale * 500;
            message = `进攻${stageName},该城市为${sg_constant.city_type_cn[cityType]},攻方需要兵力${atkTroop},守方需要兵力${defTroop}`;
        } else {
            //古战场
            const ancientCityIds = sg_constant.city_follow_mapping[sg_constant.city_follow.ancient];
            const commonAncientCitys = _.intersection(ancientCityIds, defUser.citys);
            troopScale = commonAncientCitys.length;
            atkTroop = troopScale * 1500;
            defTroop = troopScale * 500;
            atkConsumeTroop = troopScale * 500;
            message = `进攻古战场${stageName},防守方有${troopScale}座古战场,攻方需要兵力${atkTroop},守方需要兵力${defTroop}`;
        }

        if (atkUser.troop < atkTroop) {
            message += ",但是攻方兵力不足,无法进攻。";
            wsUtils.gameLog(message);
            return payToll(stageId);//触发付费
        }
        if (defUser.troop < defTroop) {
            message += ",但是守方兵力不足";
            wsUtils.gameLog(message);
            //TODO 触发进攻胜利结算
            return;
        }
        //定义一个ID,用来甄别攻城记录,并记录在本局游戏信息中
        const battleId = _.now();
        const battleInfo = {
            battleId,
            stageId,
            cityName: city.stageName,
            atkUserId: atkUser.userId,
            defUserId: defUser.userId,
            atkUserName: atkUser.name,
            defUserName: defUser.name,
            atkUserHeros: atkUser.heros,
            defUserHeros: defUser.heros,
            atkConsumeTroop,
            defConsumeTroop,
            atkUserOk: false,
            defUserOk: false,
            atkHeroId: "",
            defHeroId: ""
        };
        currentGameInfo.nextBattleInfo = battleInfo;

        message += ",攻城开始";
        wsUtils.gameLog(message);
        wsUtils.updateRoomToAll(room);
        io.emit("startBattle", battleInfo);
    });
    /**
     * 选择完英雄开始比较
     * 这里由于会执行2次,所以不管谁先谁后,都会检测双方是否都已经选择好
     */
    socket.on('heroSelected', (battleId, heroId) => {
        console.log(`heroSelected battleId:${battleId} heroId:${heroId}`);
        const nextBattleInfo = currentGameInfo.nextBattleInfo;
        console.log("nextBattleInfo ", nextBattleInfo);
        if (battleId != nextBattleInfo.battleId) {
            return wsUtils.errorLog("攻城数据不匹配");
        }

        if (nextBattleInfo.atkUserId === socket.userId) {
            nextBattleInfo.atkHeroId = heroId;
            nextBattleInfo.atkUserOk = true;//攻方表示准备好了
            wsUtils.gameLog(`攻方${nextBattleInfo.atkUserName}已经选好武将了`);
        } else if (nextBattleInfo.defUserId === socket.userId) {
            nextBattleInfo.defHeroId = heroId;
            nextBattleInfo.defUserOk = true;//守方表示准备好了
            wsUtils.gameLog(`守方${nextBattleInfo.defUserName}已经选好武将了`);
        } else {
            return wsUtils.alertLog("当前用户并未处在攻城中");
        }
        startBattle();
    });

    /**
     * 开始攻城战
     */
    const startBattle = () => {
        const nextBattleInfo = currentGameInfo.nextBattleInfo;
        if (!nextBattleInfo.atkUserOk || !nextBattleInfo.defUserOk) {
            return wsUtils.gameLog("等待双方选择武将完毕");
        }
        const messages = battle_service.startBattle(nextBattleInfo, roomUsers, currentGameInfo);

        wsUtils.gameLog(messages);

        //清空战斗信息
        currentGameInfo.nextBattleInfo = {};

        wsUtils.updateRoomToAll(room);
        wsUtils.eventOver();
    };


    /////////////////////////////////////////////

    /**
     * 初始化游戏
     */
    const initGame = () => {
        currentGameInfo = new SG_Game();

        room.gameInfo = currentGameInfo;//将游戏属性设置到房间属性中

        let lordIds = _.shuffle(sg_constant.lord_id_array);
        const selectedLords = [];
        let userIndex = 0;
        //初始化君主
        roomUsers.forEach(user => {
            //FIXME 暂时用随机分配君主(ID 1 14 27 40),将来做成可以选的
            const lordId = lordIds.shift();
            user.heros.push(lordId);
            user.lordName = sg_constant.lord_property[lordId].name;
            user.lordAvatar = sg_constant.lord_property[lordId].avatar;
            user.lordId = lordId;
            user.offset = userIndex++ * sg_constant.avatar_offset;//偏移量暂时设置为20
            user.updateName();//更新整体的名称
            selectedLords.push(lordId);
        });
        //去掉选择掉的君主
        currentGameInfo.herosOrders = _.difference(currentGameInfo.herosOrders, selectedLords);

        roomUsers.forEach(user => {
            //金钱和兵力早已初始化过了,这里只摸3张武将卡
            _.times(3, () => {
                const cardId = getNextCardIndex();
                if (cardId) {
                    user.heros.push(cardId);
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
            wsUtils.gameLog("当前回合用户:" + nextUser.name);
            /*
             为了防止某些用户掉线,而造成这个数值的不正确
             这里判断每个人的总轮数,取最大值作为游戏的总轮数值
             */
            if (currentGameInfo.turn < nextUser.turn) {
                currentGameInfo.turn = nextUser.turn;
            }

            //判断用户是否暂停,如是则再调用一次该方法
            if (nextUser.suspended > 0) {
                nextUser.suspended = nextUser.suspended - 1;
                wsUtils.gameLog(`${nextUser.name}暂停一轮`);
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
        if (currentGameInfo.herosOrders.length === 0) {
            wsUtils.gameLog("国库无剩余武将了!");
            return false;
        }
        return currentGameInfo.herosOrders.shift();
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
     * 获取武将信息
     * @param heroId
     */
    const getHero = (heroId) => {
        return common.getHero(heroId);
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
/**
 * 支付金钱,不够则全交
 * @param currentUser
 * @param money
 * @returns {*}
 */
const payMoney = (currentUser, money) => {
    if (currentUser.money < money) {
        money = currentUser.money;
        currentUser.money = 0;
    } else {
        currentUser.money = currentUser.money - money;
    }
    return money;
};

module.exports = init;