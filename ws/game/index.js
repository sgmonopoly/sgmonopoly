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
    let currentGame;

    /**
     * 开始游戏
     */
    socket.on('startGame', () => {
        //检查当前房间所有人是否都准备好了
        if (!checkAllReady(roomUsers)) {
            return wsUtils.errorLog("有人未准备!");
        }
        //初始化游戏
        initGame();

        //将所有人置为开始游戏状态
        modifyAllUserStatus(roomUsers, sg_constant.user_status.gaming);
        room.isGaming = true;
        io.emit("startGameSuccess");
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
        nextTurn();
    });
    /**
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
                //TODO upgradeCitys没做
                changeDataArray(changeData, "addCards", "removeCards", user, "cards");
                changeDataArray(changeData, "addSuggestions", "removeSuggestions", user, "suggestions");
                changeDataNumber(changeData, "suspended", user, "suspended");
            }
        });

        wsUtils.updateRoomToAll(room);
    });

    /**
     * 掷骰子,并广播骰子点数
     * 可以前端直接传,不传的话就后端随机生成
     */
    socket.on('throwDice', (point = getDicePoint(currentGame.diceRange)) => {
        wsUtils.gameLog(socket.nickname + "投掷点数:" + point);
        io.emit('diceResult', {
            userId: socket.userId,
            nickname: socket.nickname,
            point: point
        });
    });

    /**
     * 初始化游戏
     */
    const initGame = () => {
        currentGame = new SG_Game();
        //洗牌,数字对应卡片数量
        currentGame.cardOrders = common.createShuffledArray(sg_constant.item_count.card);
        currentGame.suggestionOrder = common.createShuffledArray(sg_constant.item_count.suggestion);
        currentGame.situationOrders = common.createShuffledArray(sg_constant.item_count.situation);
    };
    /**
     * 为下一回合发送消息
     */
    const nextTurn = () => {
        try {
            const nextUser = getNextUser();
            wsUtils.gameLog("当前回合用户:" + nextUser.nickname);
            io.emit("nextTurn", nextUser.userId);
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
        //先获取下一个用户索引
        changeNextUserIndex();
        safeCount++;
        if (safeCount > 10) {
            //安全监测,以防万一,如果永远取不到下一个用户直接暂停报错
            throw new Error("房间无人在线!");
        }
        let nextUser = roomUsers[currentGame.currentUserIndex];
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
        if (currentGame.currentUserIndex >= roomUsers.length - 1) {
            //如果当前用户索引大于等于长度时,重置
            currentGame.currentUserIndex = 0;
        } else {
            currentGame.currentUserIndex = currentGame.currentUserIndex + 1;
        }
    };

    /**
     * 获取下一张牌,没有则重新洗牌
     * @returns {T|*}
     */
    const getNextCardIndex = () => {
        if (currentGame.cardOrders.length === 0) {
            currentGame.cardOrders = common.createShuffledArray(sg_constant.item_count.card);
        }
        return currentGame.cardOrders.shift();
    };
    /**
     * 获取下一张紧急军情,没有则重新洗牌
     * @returns {T|*}
     */
    const getNextSituationIndex = () => {
        if (currentGame.situationOrders.length === 0) {
            currentGame.situationOrders = common.createShuffledArray(sg_constant.item_count.situation);
        }
        return currentGame.situationOrders.shift();
    };
    /**
     * 获取下一张锦囊妙计,没有则重新洗牌
     * @returns {T|*}
     */
    const getNextSuggestionIndex = () => {
        if (currentGame.suggestionOrder.length === 0) {
            currentGame.suggestionOrder = common.createShuffledArray(sg_constant.item_count.suggestion);
        }
        return currentGame.suggestionOrder.shift();
    };


    socket.on('disconnect', () => {
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
 * 过滤变换的数据
 * @param changeData
 * @param addKey
 * @param removeKey
 * @param user
 * @param userkey
 */
const changeDataArray = (changeData, addKey, removeKey, user, userkey) => {
    if (_.isArray(changeData[addKey])) {
        const newArray = user[userkey].concat(changeData[addKey]);
        user[userkey] = _.uniq(newArray, true);
    }
    if (_.isArray(changeData[removeKey])) {
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
    const ranIndex = Math.floor(Math.random() * diceRange.length + 1) - 1;
    return diceRange[ranIndex];
};

module.exports = init;

console.log(getDicePoint([0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]));
