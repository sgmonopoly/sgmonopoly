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
        wsUtils.gameLog(socket.nickname+"结束了当前回合");
        wsUtils.updateRoomToAll(room);
        nextTurn();
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
        try{
            const nextUser = getNextUser();
            wsUtils.gameLog("当前回合用户:"+nextUser.nickname);
            io.emit("nextTurn",nextUser.userId);
        }catch (e){
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
        nextTurn();
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

module.exports = init;