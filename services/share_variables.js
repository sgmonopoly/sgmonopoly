/**
 * Created by yuanxiang on 3/7/17.
 * 存放共享的变量
 */
'use strict'
const sg_constant = require("../services/sg_constant")
const GAME_Room = require("../models/game_room")

let allRoom = []

sg_constant.roomNumbers.forEach(roomNumber => {
    allRoom.push(new GAME_Room(roomNumber, sg_constant.roomNamePrefix + roomNumber, '', '', [], 0))
})

exports.allRoom = allRoom
