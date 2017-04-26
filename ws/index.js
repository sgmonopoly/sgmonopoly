'use strict';

//websocket
const io = require('socket.io')();
const sg_constant = require("../services/sg_constant");
const ios = require("socket.io-express-session");
const session = require("../session");
const _ = require("lodash");
/**
 * 这是所有房间的对象
 */
let allRoom = require("../services/share_variables").allRoom;

sg_constant.roomNumbers.forEach(roomNumber => {
    const roomIo = io.of("/room/" + roomNumber);
    //让websocket也能用express的session中间件
    roomIo.use(ios(session));
    roomIo.on('connection', (socket) => {
        //成功连接握手,发送一条信息
        socket.emit(sg_constant.ws_name.handshake, "success connected server");

        socket.on("testSession", ()=> {
            console.log("test session:", socket.handshake.session.user);
        });

        const wsUtils = {
            /**
             * 局部
             * 全局错误日志
             */
            errorLog: (message) => {
                socket.emit(sg_constant.ws_name.errorLog, message);
            },
            /**
             * 全局
             * 全局错误日志
             */
            errorLogAll: (message) => {
                roomIo.emit(sg_constant.ws_name.errorLog, message);
            },
            /**
             * 广播
             * 增加聊天记录
             */
            chat: (message) => {
                roomIo.emit(sg_constant.ws_name.chat, message);
            },
            /**
             * 广播
             * 增加操作日志
             */
            gameLog: (message) => {
                roomIo.emit(sg_constant.ws_name.gameLog, message);
            },
            /**
             * 广播
             * 给所有人更新当前房间所有信息(包括用户),其他人触发时用
             */
            updateRoomToAll: (room) => {
                const currentGameInfo = room.gameInfo;
                const currentGameInfoClone = _.omit(currentGameInfo, "cardOrders", "situationOrders", "suggestionOrder", "diceRange");
                const currentRoomInfo = _.omit(room,"gameInfo");
                roomIo.emit(sg_constant.ws_name.room, currentRoomInfo, currentGameInfoClone);
            }
        };

        require("./room")(socket, roomIo, roomNumber, wsUtils);//注入_socket对象
        require("./game")(socket, roomIo, roomNumber, wsUtils);

    });

});


exports.listen = (server) => {
    return io.listen(server);
};
