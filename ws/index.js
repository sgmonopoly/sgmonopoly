'use strict';

//websocket
const io = require('socket.io')();
io.of("/room").on('connection', (_socket) => {
    console.log("1 user enter room ", _socket.id, _socket.nickname);

     /**
     * 来更新socket的用户对象
     */
    _socket.on('setRoomUserInfo', (userId, nickname, avatar)=> {
        _socket.userId = userId;
        _socket.nickname = nickname;
        _socket.avatar = avatar;
    });

    require("./room").init(_socket, io.of("/room"));//注入_socket对象
});


exports.listen = (_server) => {
    return io.listen(_server);
};