'use strict';

const sg_constant = require("../../services/sg_constant");
const allRoom = require("../../services/share_variables").allRoom;
const SG_Game = require("../../models/sg_game");
const _ = require("lodash");
const common = require("../../services/common_roomUtils");

exports.init = (socket, io, roomNumber, wsUtils) => {

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
        if(!checkAllReady(roomUsers)){
            return wsUtils.errorLog("有人未准备!");
        }
        //初始化游戏
        initGame();

        //将所有人置为开始游戏状态
        modifyAllUserStatus(roomUsers, sg_constant.user_status.gaming);
        room.isGaming = true;
        wsUtils.updateRoomToAll(room);
    });

    /**
     * 本轮结束
     */
    socket.on('endTurn', () => {
        wsUtils.updateRoomToAll(room);
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
     * 获取下一张牌,没有则重新洗牌
     * @returns {T|*}
     */
    const nextCard = () => {
        if(currentGame.cardOrders.length === 0){
            currentGame.cardOrders = common.createShuffledArray(sg_constant.item_count.card);
        }
        return currentGame.cardOrders.shift();
    };
    /**
     * 获取下一张紧急军情,没有则重新洗牌
     * @returns {T|*}
     */
    const nextSituation = () => {
        if(currentGame.situationOrders.length === 0){
            currentGame.situationOrders = common.createShuffledArray(sg_constant.item_count.situation);
        }
        return currentGame.situationOrders.shift();
    };
    /**
     * 获取下一张锦囊妙计,没有则重新洗牌
     * @returns {T|*}
     */
    const nextuggestion = () => {
        if(currentGame.suggestionOrder.length === 0){
            currentGame.suggestionOrder = common.createShuffledArray(sg_constant.item_count.suggestion);
        }
        return currentGame.suggestionOrder.shift();
    };
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



//console.log(shuffle(10));