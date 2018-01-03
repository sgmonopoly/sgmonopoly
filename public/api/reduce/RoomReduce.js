/**
 * Created by yuanxiang on 12/28/17.
 */
import {roomAction} from "../network"
import PlayerDom from '../../pages/room/components/PlayerDom'
import sg_constant from "../../../services/sg_constant"

/**
 * 从服务端接受请求,业务和房间相关
 */
export default class RoomReduce {
  constructor(socket, {playerContainer, chatContainer, controlContainer, gameLogContainer, infoContainer, gameContainer}) {
    this.socket = socket
    this.socket.on("handshake", this.handshake.bind(this))
    this.socket.on("room", this.room.bind(this))
    this.socket.on("chat", this.chat.bind(this))
    this.socket.on("gameLog", this.gameLog.bind(this))
    this.socket.on("errorLog", this.errorLog.bind(this))
    this.socket.on("alertLog", this.alertLog.bind(this))
    this.socket.on("readyCheck", this.readyCheck.bind(this))

    this.playerContainer = playerContainer
    this.chatContainer = chatContainer
    this.controlContainer = controlContainer
    this.gameLogContainer = gameLogContainer
    this.infoContainer = infoContainer
    this.gameContainer = gameContainer
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
    const removeUserIds = this.playerContainer.getAllPlayerIds()
    //更新用户
    for (const user of roomInfo.users) {
      this.playerContainer.mergePlayer(
        new PlayerDom({
            id: user.userId,
            img: user.lordAvatar || 'http://img1.3lian.com/2015/w3/98/d/1.jpg',
            name: user.name,
            color: user.color || 'red',
            heroCount: user.heros.length,
            money: user.money,
            troop: user.troop,
            citiesCount: user.citys.length,
            isHost: user.userId === roomInfo.hostId//确认房主
          }
        )
      )
      //移除已有的要删除的用户ID
      removeUserIds.splice(removeUserIds.findIndex(item => item === user.userId), 1)
    }

    //移除已离线用户
    this.removeOffLineUsers(removeUserIds)
    //更新时间
    this.updateTime(gameInfo)
    //更新棋子
    this.gameContainer.updatePiecePosition(roomInfo.users);
    //更新武将数
    this.updateHeroNum(gameInfo)
    //设置开始游戏标志
    this.setStartGameFlag(gameInfo)

    //domHanlder.updateRoomInfo(roomInfo);
    //domHanlder.updateGameInfo(gameInfo);
    //canvasHandler.updatePiecePosition(roomInfo.users);
  }

  /**
   * 检查准备
   */
  readyCheck(userId, readyStatus) {
    console.log("receive readyCheck:", userId, readyStatus)
    this.playerContainer.setPlayerValueById({readyStatus}, userId)
    const player = this.playerContainer.getPlayer(userId)
    if(sg_constant.user_status.unready === readyStatus){
      player.unready()
      this.controlContainer.unready()
    }else if(sg_constant.user_status.ready === readyStatus){
      player.ready()
      this.controlContainer.ready()
    }
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
    this.gameLogContainer.addLog(message)
    //domHanlder.addGameLog(message);
  }

  /**
   * 接收错误日志
   */
  errorLog(message) {
  }

  /**
   * 接收警告日志
   */
  alertLog(message) {
    console.log("警告:", message);
  }

  /**
   * 移除已离线用户
   * @param removeUserIds
   */
  removeOffLineUsers(removeUserIds){
    console.log("removeUserIds", removeUserIds)
    if(removeUserIds && removeUserIds.length > 0){
      this.playerContainer.removePlayer(removeUserIds)
    }
  }

  /**
   * 更新时间
   * @param gameInfo
   */
  updateTime(gameInfo){
    if(gameInfo && gameInfo.startTime){
      const now = parseInt(new Date().getTime() / 1000) - gameInfo.startTime
      this.infoContainer.startGameTime(now)
    }
  }

  /**
   * 设置开始游戏标志
   */
  setStartGameFlag(gameInfo){
    if(gameInfo && gameInfo.startTime){
      this.infoContainer.getSubComponent("controlDom").setState({isGameStart:true})
    }
  }

  /**
   * 更新武将数
   * @param gameInfo
   */
  updateHeroNum(gameInfo){
    if(gameInfo && gameInfo.herosOrders){
      this.infoContainer.setLeftHeroes(gameInfo.herosOrders.length)
    }
  }

}