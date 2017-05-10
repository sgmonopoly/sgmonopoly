/**
 * Created by yuanxiang on 4/21/17.
 * 这个用来连接ws
 */
import {socket, room_ws, game_ws} from '../../../api/ws/emit'
import * as domHanlder from './domHanlder'
import * as canvasHandler from './canvasHandler'

const myUserId = window.localStorage.getItem("sgm_userId");
if(!myUserId){
    alert("获取不到用户ID,请重新登入");
}

/**
 * 连ws
 * @param roomId
 */
const initNetwork = (roomId) => {

    console.log("roomId:", roomId);
    room_ws.connect(roomId);
    socket.on("handshake", message => {
        console.log("handshake message:", message);
        room_ws.enterRoom(myUserId);
    });

    /**
     * 更新房间信息
     */
    socket.on("room", (roomInfo,gameInfo) => {
        domHanlder.updateRoomInfo(roomInfo);
        domHanlder.updateGameInfo(gameInfo);
    });

    /**
     * 接收聊天记录
     */
    socket.on("chat", message => {
        domHanlder.addChatLog(message);
    });

    /**
     * 接收游戏日志
     */
    socket.on("gameLog", message => {
        domHanlder.addGameLog(message);
    });

    /**
     * 接收错误日志
     */
    socket.on("errorLog", message => {
        domHanlder.addErrorLog(message);
    });

    /**
     * 成功开始游戏时
     * 设置棋子
     */
    socket.on("startGameSuccess", roomUsers => {
        roomUsers.forEach(user => {
            canvasHandler.pieceReady(user.lordAvatar, user.offset);
        });
    });

    /**
     * 游戏结束
     */
    socket.on("gameover", () => {
        alert("游戏结束");
    });

    /**
     * 下一回合时
     */
    socket.on("nextTurn", currentTurnUser => {
        domHanlder.handleNextTurn(currentTurnUser,myUserId);
    });

    /**
     * 掷骰子结果
     */
    socket.on("diceResult", result => {
        const point = result.point;
        console.log("掷骰子点数:",point);
        //TODO 根据点数走路
    });

};

export {initNetwork}