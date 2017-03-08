'use strict';

//websocket
const io = require('socket.io')();
const sg_constant = require("../services/sg_constant");
/**
 * 这是所有房间的对象
 */
let allRoom = require("../services/share_variables").allRoom;

sg_constant.roomNumbers.forEach(roomNumber => {
    const roomIo = io.of("/room" + roomNumber);

    roomIo.on('connection', (socket) => {

        const utils = {
            /**
             * 增加聊天记录
             */
            chat: (message) => {
                roomIo.emit(sg_constant.ws_name.chat, message);
            },
            /**
             * 给所有人更新当前房间所有信息(包括用户),其他人触发时用
             */
            updateRoomToAll: (room) => {
                roomIo.emit(sg_constant.ws_name.room, room);
            },
            /**
             * 只给自己更新当前房间所有信息(包括用户),前端POLL方式给自己用
             */
            updateRoomToMe: (room) => {
                socket.emit(sg_constant.ws_name.room, room);
            }
        };

        require("./room").init(socket, roomIo, roomNumber, utils);//注入_socket对象
        require("./game").init(socket, roomIo, roomNumber, utils);

    });

});


exports.listen = (server) => {
    return io.listen(server);
};