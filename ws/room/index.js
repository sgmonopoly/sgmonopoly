'use strict';

const sg_constant = require("../../services/sg_constant");
const common = require("../../services/common_roomUtils");
const allRoom = require("../../services/share_variables").allRoom;

exports.init = (socket, roomIo, roomNumber, wsUtils) => {
    /**
     * 房间对象
     */
    let room = allRoom[roomNumber - 1];
    let roomUsers = room._users;//array

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

        wsUtils.updateRoomToAll(room);
        //给聊天记录发送消息
        wsUtils.chat("欢迎" + nickname + "进入房间");

    });
    /**
     * 退出房间(直接退出游戏)
     */
    socket.on('quitRoom', (userId = socket.userId)=> {
        const lostGameUserIndex = common.getUserIndex(roomUsers, userId);
        if (lostGameUserIndex >= 0) {
            //直接剔除该用户
            roomUsers.splice(lostGameUserIndex, 1);
            wsUtils.updateRoomToAll(room);
            //给聊天记录发送消息
            wsUtils.chat(socket.nickname + "已经退出房间");
        }
    });

    /**
     * 断开事件(区分掉线和直接退出)
     */
    socket.on('disconnect', () => {
        console.log(`${socket.userId} ${socket.nickname} "断了`);

        const lostGameUserIndex = common.getUserIndex(roomUsers, socket.userId);
        console.log(`删除索引 ${lostGameUserIndex}`);
        if (lostGameUserIndex >= 0) {
            if (room._isGaming) {
                //正在游戏的话,设置该用户为掉线
                roomUsers[lostGameUserIndex]._status = sg_constant.user_status.lost;
                wsUtils.updateRoomToAll(room);
                //给聊天记录发送消息
                wsUtils.chat(socket.nickname + "掉线");
            } else {
                //没有正在游戏的话,直接剔除该用户
                roomUsers.splice(lostGameUserIndex, 1);
                wsUtils.updateRoomToAll(room);
                //给聊天记录发送消息
                wsUtils.chat(socket.nickname + "已经退出房间");
            }
        }
    });
    /**
     * 全局更新当前房间用户信息
     * 前端poll这个接口,只给自己发送
     */
    socket.on('updateRoom', ()=> {
        wsUtils.updateRoomToMe(room);
    });

    /**
     * 举手准备
     */
    socket.on('toReady', () => {
        const currentUser = common.getUser(roomUsers, socket.userId);
        if (currentUser) {
            currentUser._status = sg_constant.user_status.ready;
            wsUtils.updateRoomToAll(room);
            wsUtils.chat(socket.nickname + "准备好了");
        }
    });
    /**
     * 取消准备
     */
    socket.on('toUnready', () => {
        const currentUser = common.getUser(roomUsers, socket.userId);
        if (currentUser) {
            currentUser._status = sg_constant.user_status.unready;
            wsUtils.updateRoomToAll(room);
            wsUtils.chat(socket.nickname + "取消了准备");
        }
    });

    /**
     * 踢人
     */
    socket.on('kick', (kickUserId)=> {
        const lostGameUserIndex = common.getUserIndex(roomUsers, kickUserId);
        if (lostGameUserIndex >= 0) {
            //直接剔除该用户
            roomUsers.splice(lostGameUserIndex, 1);
            wsUtils.updateRoomToAll(room);
            //给聊天记录发送消息
            wsUtils.chat(socket.nickname + "被踢出房间");
        }
    });

};


