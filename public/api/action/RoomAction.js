/**
 * Created by yuanxiang on 12/28/17.
 */
import myUserId from '../domain/localData'

export default class RoomAction {
  constructor(socket) {
    this.socket = socket
  }

  enterGameRoom() {
    this.socket.emit("enterRoom", myUserId);
  }

  quitGameRoom(isKick = false) {
    this.socket.emit("quitRoom", isKick);
  }

  toReady() {
    this.socket.emit("toReady");
  }

  toUnready() {
    this.socket.emit("toUnready");
  }

  kick(kickUserId) {
    this.socket.emit("kick", kickUserId);
  }

  addChatMessage(message) {
    this.socket.emit("addChatMessage", message);
  }

}