/**
 * Created by yuanxiang on 12/28/17.
 */
import {roomAction} from "../network"
import * as domHanlder from '../pageHandler/DomHandler'
import * as canvasHandler from '../pageHandler/canvasHandler'

export default class RoomReduce {
  constructor(socket) {
    this.socket = socket
    this.socket.on("handshake", this.handshake)
    this.socket.on("room", this.room)
    this.socket.on("chat", this.chat)
    this.socket.on("gameLog", this.gameLog)
    this.socket.on("errorLog", this.errorLog)
    this.socket.on("alertLog", this.alertLog)
  }

  /**
   * WS连接握手通知,并直接发送进入房间的消息
   */
  handshake(message) {
    console.log("receive handshake:", message);
    roomAction.enterGameRoom();
  }

  /**
   * 更新房间信息
   */
  room(roomInfo, gameInfo) {
    console.log("receive room:", roomInfo, gameInfo);
    domHanlder.updateRoomInfo(roomInfo);
    domHanlder.updateGameInfo(gameInfo);
    canvasHandler.updatePiecePosition(roomInfo.users);
  }

  /**
   * 接收聊天记录
   */
  chat(message) {
    console.log("receive chat:", message);
    domHanlder.addChatLog(message);
  }

  /**
   * 接收游戏日志
   */
  gameLog(message) {
    console.log("receive gameLog:", message);
    domHanlder.addGameLog(message);
  }

  /**
   * 接收错误日志
   */
  errorLog(message) {
    console.log("receive errorLog:", message);
    domHanlder.addErrorLog(message);
  }

  /**
   * 接收警告日志
   */
  alertLog(message) {
    alert(message);
  }

}