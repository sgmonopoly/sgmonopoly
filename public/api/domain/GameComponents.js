/**
 * Created by yuanxiang on 12/28/17.
 */
/**
 * 将游戏的所有页面组件汇总在这里
 */
export default class GameComponents {
  constructor(playerContainer, infoContainer, gameLogContainer, chatContainer) {
    this.playerContainer = playerContainer
    this.infoContainer = infoContainer
    this.gameLogContainer = gameLogContainer
    this.chatContainer = chatContainer
  }
}