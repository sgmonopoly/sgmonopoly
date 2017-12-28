/**
 * Created by yuanxiang on 12/28/17.
 */
/**
 * Created by yuanxiang on 4/21/17.
 * 这个用来连接ws
 */
import {enterRoom} from '../../api/rest/rooms'

import RoomAction from "../../api/action/RoomAction"
import GameAction from "../../api/action/GameAction"
import RoomReduce from "../../api/reduce/RoomReduce"
import GameReduce from "../../api/reduce/GameReduce"


let roomAction, gameAction, roomReduce, gameReduce

/**
 * 连ws并接收ws任务
 * @param roomId
 */
const initNetwork = async(roomId) => {

  console.log(`roomId:${roomId}`);

  //为了解决进入游戏后,刷新出错的问题,这里也执行一次enterRoom方法
  try {
    await enterRoom(roomId)
  } catch (err) {
    alert(err.response.data);
    return console.log(err.response.data);
  }

  const socket = io("/room/" + roomId)

  console.log("前端连接初始化成功")

  roomAction = new RoomAction(socket)
  gameAction = new GameAction(socket)
  roomReduce = new RoomReduce(socket)
  gameReduce = new GameReduce(socket)
};

export {initNetwork, roomAction, gameAction, roomReduce, gameReduce}