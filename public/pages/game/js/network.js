/**
 * Created by yuanxiang on 4/21/17.
 * 这个用来连接ws
 */
import {socket, room_ws, game_ws} from '../../../api/ws/emit'
import * as domHanlder from './domHanlder'
import * as canvasHandler from './canvasHandler'
import * as gameService from './gameService'
import myUserId from './localData'

/**
 * 连ws并接收ws任务
 * @param roomId
 * //FIXME 重复刷新页面,会报错
 */
const initNetwork = (roomId) => {

    console.log("roomId:", roomId);
    room_ws.connect(roomId);
    /**
     * WS连接握手通知
     */
    socket.on("handshake", message => {
        console.log("handshake message:", message);
        room_ws.enterRoom(myUserId);
    });

    /**
     * 更新房间信息
     */
    socket.on("room", (roomInfo, gameInfo) => {
        domHanlder.updateRoomInfo(roomInfo);
        domHanlder.updateGameInfo(gameInfo);
        canvasHandler.updatePiecePosition(roomInfo.users);
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
     * 接收警告日志
     */
    socket.on("alertLog", message => {
        alert(message);
    });

    /**
     * 成功开始游戏时
     */
    /*
     socket.on("startGameSuccess", roomUsers => {

     });
     */

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
        domHanlder.handleNextTurn(currentTurnUser);
    });

    /**
     * 掷骰子结果,之后走路
     */
    socket.on("diceResultForWalk", result => {
        const point = result.point;
        const userId = result.userId;
        const midway = result.midway;
        const offset = result.offset;
        console.log("掷骰子点数:", point, "途径", midway);
        //根据点数走路
        canvasHandler.movePiece(userId, midway, offset);

        gameService.targetPositionFeedback(midway.pop(), result.userInfo);
    });
    /**
     * 后端控制前端,什么时候显示回合结束按钮
     */
    socket.on("showEndTurnBtn", () => {
        domHanlder.showEndTurnBtn();
    });

};

export {initNetwork}