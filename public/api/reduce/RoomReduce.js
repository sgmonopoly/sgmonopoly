/**
 * Created by yuanxiang on 12/28/17.
 */
import {roomAction} from "../network"
import * as domHanlder from '../pageHandler/DomHandler'
import * as canvasHandler from '../pageHandler/canvasHandler'
import PlayerDom from '../../pages/room/components/PlayerDom'

/**
 * 从服务端接受请求,业务和房间相关
 */
export default class RoomReduce {
  constructor(socket, {playerContainer, chatContainer}) {
    this.socket = socket
    this.socket.on("handshake", this.handshake.bind(this))
    this.socket.on("room", this.room.bind(this))
    this.socket.on("chat", this.chat.bind(this))
    this.socket.on("gameLog", this.gameLog.bind(this))
    this.socket.on("errorLog", this.errorLog.bind(this))
    this.socket.on("alertLog", this.alertLog.bind(this))
    this.playerContainer = playerContainer
    this.chatContainer = chatContainer
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
    console.log("receive room:", roomInfo, gameInfo)
    console.log("playerContainer:", this.playerContainer)
    for (const user of roomInfo.users) {
      this.playerContainer.addPlayer(
        new PlayerDom({
            id: user.userId,
            img: 'http://img1.3lian.com/2015/w3/98/d/1.jpg',
            name: user.nickname,
            color: user.color || 'red',
            heroCount: user.heros.length,
            money: user.money,
            troop: user.troop,
            citiesCount: user.citys.length
          }
        )
      )
    }

    //domHanlder.updateRoomInfo(roomInfo);
    //domHanlder.updateGameInfo(gameInfo);
    //canvasHandler.updatePiecePosition(roomInfo.users);
  }

  /**
   * 接收聊天记录
   */
  chat(message) {
    console.log("receive chat:", message)
    this.chatContainer.addMessage(message)
    //domHanlder.addChatLog(message);
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