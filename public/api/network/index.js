/**
 * Created by yuanxiang on 4/21/17.
 * 这个用来连接ws
 */
'use strict'
import {enterRoom} from '../../api/rest/rooms'

import RoomAction from "../../api/action/RoomAction"
import GameAction from "../../api/action/GameAction"
import RoomReduce from "../../api/reduce/RoomReduce"
import GameReduce from "../../api/reduce/GameReduce"

let roomAction, gameAction, roomReduce, gameReduce

/**
 * 连ws并接收ws任务
 * @param roomId
 * @param gameComponents
 */
const initNetwork = async(roomId, gameComponents) => {

  //为了解决进入游戏后,刷新出错的问题,这里也执行一次enterRoom方法
  try {
    await enterRoom(roomId)
  } catch (err) {
    return console.log(err.response.data)
  }

  const socket = io("/room/" + roomId)

  console.log("roomId:${roomId}, 前端连接初始化成功")

  roomAction = new RoomAction(socket)
  gameAction = new GameAction(socket)
  roomReduce = new RoomReduce(socket, gameComponents)
  gameReduce = new GameReduce(socket, gameComponents)
}

export {initNetwork, roomAction, gameAction, roomReduce, gameReduce}