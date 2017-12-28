/**
 * Created by yuanxiang on 12/28/17.
 */
import {currentOwnerUserId} from '../domain/LocalCacheData'

export default class RoomAction {
  constructor(socket) {
    this.socket = socket
  }

  enterGameRoom() {
    console.log("send enterGameRoom ", currentOwnerUserId);
    this.socket.emit("enterRoom", currentOwnerUserId);
  }

  quitGameRoom(isKick = false) {
    console.log("send quitGameRoom ", isKick);
    this.socket.emit("quitRoom", isKick);
  }

  toReady() {
    console.log("send toReady");
    this.socket.emit("toReady");
  }

  toUnready() {
    console.log("send toUnready ");
    this.socket.emit("toUnready");
  }

  kick(kickUserId) {
    console.log("send kick ", kickUserId);
    this.socket.emit("kick", kickUserId);
  }

  addChatMessage(message) {
    console.log("send addChatMessage ", message);
    this.socket.emit("addChatMessage", message);
  }

}