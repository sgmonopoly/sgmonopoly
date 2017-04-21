/**
 * Created by yuanxiang on 4/21/17.
 */
import {socket, room_ws, game_ws} from '../../../api/ws/emit'
import $ from 'jquery'
/**
 * 连ws
 * @param roomId
 */

const userId = window.localStorage.getItem("sgm_userId");
if(!userId){
    alert("获取不到用户ID,请重新登入");
}

const chatLog = $("#chatLog");
const errorLog = $("#errorLog");
const gameLog = $("#gameLog");
const initNetwork = (roomId) => {

    console.log("roomId:", roomId);
    room_ws.connect(roomId);
    socket.on("handshake", message => {
        console.log("handshake message:", message);
        room_ws.enterRoom(userId);
    });

    /**
     * 接收聊天记录
     */
    socket.on("chat", message => {
        chatLog.append(message + "\n");
    });

    /**
     * 接收游戏日志
     */
    socket.on("gameLog", message => {
        gameLog.append(message + "\n");
    });

    /**
     * 接收错误日志
     */
    socket.on("errorLog", message => {
        errorLog.append(message + "\n");
    });

};

export {initNetwork}