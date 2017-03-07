'use strict';

const SG_User = require("../../models/sg_user");
const sg_constant = require("../../services/sg_constant");
const allRoom = require("../../services/share_variables").allRoom;

exports.init = (socket, io, roomNumber) => {
    /**
     * 房间对象
     */
    let room = allRoom[roomNumber - 1];
    let roomUsers = room._users;//array

    socket.on('test', () => {
        console.log('test', roomUsers);
    });
    socket.on('test1', () => {
        roomUsers.length = 0;
        console.log('test1', roomUsers);
    });

    /**
     * 来更新socket的用户对象,每次进入房间必须调用一次,且会发送进入房间消息
     */
    socket.on('enterRoom', (userId, nickname, avatar)=> {

        socket.userId = userId;
        socket.nickname = nickname;
        socket.avatar = avatar;
        //如果是正在游戏的房间的话,先判断是否为掉线重进的玩家
        if (room._isGaming) {
            for (let index = 0; index < roomUsers.length; i++) {
                if (roomUsers[index] && roomUsers[index]._userId === userId
                    && roomUsers[index]._status === sg_constant.user_status.lost) {
                    //必须是掉线状态的玩家
                    roomUsers[index]._status = sg_constant.user_status.gaming;
                    break;
                }
            }
        }

        //更新所有用户的信息
        io.emit(sg_constant.ws_name.roomUsers, roomUsers);
        //给聊天记录发送消息
        io.emit(sg_constant.ws_name.chatMessage, "欢迎" + nickname + "进入房间");

    });

    /**
     * 断开事件
     */
    socket.on('disconnect', () => {

        let lostGameUserIndex;
        for (let index = 0; index < roomUsers.length; index++) {
            if (roomUsers[index] && roomUsers[index]._userId === socket.userId) {
                lostGameUserIndex = index;
                break;
            }
        }
        if (lostGameUserIndex) {
            if (room._isGaming) {
                //正在游戏的话,设置该用户为掉线
                roomUsers[lostGameUserIndex]._status = sg_constant.user_status.lost;
            } else {
                //没有正在游戏的话,直接剔除该用户
                roomUsers.splice(lostGameUserIndex,1);
            }
        }

        //更新所有用户的信息
        io.emit(sg_constant.ws_name.roomUsers, roomUsers);
        //给聊天记录发送消息
        io.emit(sg_constant.ws_name.chatMessage, socket.nickname + "已经退出房间");
    });

};
