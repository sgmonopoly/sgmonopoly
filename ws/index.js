'use strict';

//websocket
const io = require('socket.io')();
const sg_constant = require("../services/sg_constant");
/**
 * 这是所有房间的对象
 */
let allRoom = require("../services/share_variables").allRoom;

sg_constant.roomNumbers.forEach(roomNumber => {
    const room_io = io.of("/room" + roomNumber);

    room_io.on('connection', (_socket) => {
        //console.log("1 user enter room", roomNumber, " ", _socket.id, " ", _socket.nickname);

        require("./room").init(_socket, room_io, roomNumber);//注入_socket对象
        require("./game").init(_socket, room_io, roomNumber);
    });
});


exports.listen = (_server) => {
    return io.listen(_server);
};