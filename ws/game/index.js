'use strict';

const sg_constant = require("../../services/sg_constant");
const allRoom = require("../../services/share_variables").allRoom;

exports.init = (socket, io, roomNumber, wsUtils) => {

    /**
     * 房间对象
     */
    let room = allRoom[roomNumber - 1];
    let roomUsers = room._users;//array

};