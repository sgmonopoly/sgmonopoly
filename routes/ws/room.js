'use strict';
let global_io;
exports.init = (_socket, io) => {
    global_io = io;
    console.log("login ws : ", _socket.id);
    /**
     * 暂时只有2个房间,以后再加
     */
    const rooms = ["room1", "room2"];
    /**
     * 注册进入房间的事件
     */
    rooms.forEach(room => {
        _socket.on(room, () => {
            console.log("加入房间", room);
            _socket.join(room, checkUserOnlyEnterOneRoom(room, _socket));
        });
    });
    /**
     * 断开事件,增加提出房间
     */
    _socket.on('disconnect', () => {
        const allRooms = _socket.rooms;
        let i = 0;
        for (const k in allRooms) {
            if (i++ === 0) {
                continue;//第一个属性是rooms默认自带的属性,忽略
            }
            _socket.leave(k);
        }
    });

};
//检查用户是否已经进入其它房间,将其踢出其它房间
const checkUserOnlyEnterOneRoom = (currentRoom, _socket) => {
    const allRooms = _socket.rooms;
    console.log("当前", currentRoom);
    let i = 0;
    for (const k in allRooms) {
        if (i++ === 0) {
            continue;//第一个属性是rooms默认自带的属性,忽略
        }
        if (k != currentRoom) {
            console.log("该用户想进入", currentRoom, "但他还在", k, "房间中,将其踢出", k);
            _socket.leave(k);
        }
    }
};