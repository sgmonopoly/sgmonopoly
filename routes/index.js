'use strict';
// http
const express = require('express');
const router = express.Router();

router.use('/', require("./htp"));

//websocket
const io = require('socket.io')();
io.on('connection', (_socket) => {
    console.log("1 connection ",_socket.id,_socket.nickname);
    require("./ws/room").init(_socket,io);//注入_socket对象
    require("./ws/user").init(_socket,io);
});

exports.router = router;

exports.listen = (_server) => {
    return io.listen(_server);
};