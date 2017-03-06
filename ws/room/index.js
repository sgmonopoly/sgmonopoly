'use strict';
let global_io;
const roomNamePrefix = "room";//默认返回的房间对象中,可能会包含自带属性,用这个名称来过滤房间对象
const GAME_Room = require("../../models/game_room");

/**
 * 暂时只有2个房间,以后再加
 */
const roomNames = [roomNamePrefix + "1", roomNamePrefix + "2"];
/**
 * 这是所有房间的对象
 */
let allRoom = [];

roomNames.forEach(roomName => {
    allRoom.push(new GAME_Room(roomName, [], 0));
});

exports.init = (_socket, _io) => {
    global_io = _io;
    //console.log("login ws : ", _socket.id);

    /**
     * 注册进入房间的事件
     */
    roomNames.forEach(room => {
        _socket.on(room, () => {
            console.log(_socket.nickname,"加入房间", room);
            _socket.join(room, () => {
                enterRoom(room, _socket);
            });
        });
    });

    /**
     * 离开房间
     */
    _socket.on('quitRoom', room => {
        leave(_socket, room);
    });

    /**
     * 断开事件,踢出所有房间
     */
    _socket.on('disconnect', () => {
        leave(_socket);
    });

    /**
     * 主动要求返回房间信息,测试用
     */
    _socket.on('allRoomStatus', updateAllRoomStatus);


};

const enterRoom = (currentRoom, _socket) => {
    //先判断房间是否满了
    if (checkRoomIsFull(currentRoom)) {
        leave(_socket, currentRoom, false);//超过4个人,将当前用户踢出房间,这类被踢不需要给房间内的用户发送消息
        _socket.emit("roomIsFull", currentRoom + "房间满了");
    }
    //再判断用户是否在其他房间登入过
    checkUserOnlyEnterOneRoom(currentRoom, _socket);
    //给该房间所有人发送进入消息
    global_io.to(currentRoom).emit("enterRoomSuccess", _socket.nickname + "进入房间" + currentRoom);
    //更新全局房间信息
    updateAllRoomStatus();
};

const checkRoomIsFull = (currentRoom) => {

    const roomClients = global_io.adapter.rooms[currentRoom];
    console.log("checkRoomIsFull:", roomClients);
    //由于是回调函数,该客户端已经进入房间了,所以判断是大于4个人,然后再踢出去
    if (roomClients.length > 4) {
        console.log(currentRoom, "房间满了");
        return true;
    }
    return false;
};

/**
 * 检查用户是否已经进入其它房间,将其踢出其它房间
 * @param currentRoom
 * @param _socket
 */
const checkUserOnlyEnterOneRoom = (currentRoom, _socket) => {
    const allRooms = _socket.rooms;
    console.log("当前", currentRoom);
    for (const k in allRooms) {
        if (k.startsWith(roomNamePrefix) && k != currentRoom) {
            console.log("该用户想进入", currentRoom, "但他还在", k, "房间中,将其踢出", k);
            leave(_socket, k);
        }
    }
};
const leave = (_socket, room, ifEmit = true) => {
    console.log(_socket.id," ",_socket.nickname," leave");
    //踢出指定房间
    if (room) {
        console.log(_socket.nickname,"踢出指定房间", room);
        if (ifEmit) global_io.to(room).emit("quitRoomSuccess", _socket.nickname + "退出房间" + room);
        _socket.leave(room);
        updateAllRoomStatus();
        return;
    }
    //踢出所有房间
    const allRooms = _socket.rooms;
    console.log(_socket.nickname,"踢出所有房间");
    for (const k in allRooms) {
        if (k.startsWith(roomNamePrefix)) {
            if (ifEmit) global_io.to(k).emit("quitRoomSuccess", _socket.nickname + "退出房间" + k);
            _socket.leave(k);
            updateAllRoomStatus();
        }
    }
};
/**
 * 更新所有房间信息(此方法会全局广播,代价有点大)
 * 里面要注意一下,我在考虑有2个方案
 * A,每次加入和退出房间时调用
 * B,全局调用,每3秒一次
 *
 * 暂时决定用A方式,初期玩的人少,这个请求用的也不会太多,将来如果服务器压力大了可以换成B方式
 * TODO 另外A方式可以优化,没必要全局更新,只需要更新小部分就够了,有待完成
 * @param _socket
 */
const updateAllRoomStatus = () => {
    //源生的房间对象,充斥着自带的属性,需要过滤一下
    const socketRooms = global_io.adapter.rooms;
    let realRooms = [];
    roomNames.forEach(roomName => {
        //console.log("socketRooms:",socketRooms);
        const users = [];
        if (socketRooms[roomName]) {
            const roomSockets = socketRooms[roomName].sockets;
            for (const _id in roomSockets) {
                //根据socketID 返回 socket对象,并获得nickname
                const socketObj = global_io.connected[_id];
                users.push({
                    "_id": _id,
                    "_userId": socketObj.userId,
                    "_nickname": socketObj.nickname,
                    "_avatar": socketObj.avatar
                });
            }
            const gr = new GAME_Room(roomName, users, socketRooms[roomName].length);
            realRooms.push(gr);
        }

    });
    console.log("allRoomStatus", JSON.stringify(realRooms));
    global_io.emit("allRoomStatus",realRooms);
};