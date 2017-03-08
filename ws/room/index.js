'use strict';

const sg_constant = require("../../services/sg_constant");
const allRoom = require("../../services/share_variables").allRoom;

exports.init = (socket, roomIo, roomNumber, utils) => {
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

        utils.updateRoomToAll(room);
        //给聊天记录发送消息
        utils.chat("欢迎" + nickname + "进入房间");

    });
    /**
     * 退出房间(直接退出游戏)
     */
    socket.on('quitRoom', (userId = socket.userId)=> {
        const lostGameUserIndex = getUserIndex(userId);
        if (lostGameUserIndex) {
            //直接剔除该用户
            roomUsers.splice(lostGameUserIndex, 1);
            utils.updateRoomToAll(room);
            //给聊天记录发送消息
            utils.chat(socket.nickname + "已经退出房间");
        }
    });

    /**
     * 断开事件(区分掉线和直接退出)
     */
    socket.on('disconnect', () => {

        const lostGameUserIndex = getUserIndex(socket.userId);
        if (lostGameUserIndex) {
            if (room._isGaming) {
                //正在游戏的话,设置该用户为掉线
                roomUsers[lostGameUserIndex]._status = sg_constant.user_status.lost;
                utils.updateRoomToAll(room);
                //给聊天记录发送消息
                utils.chat(socket.nickname + "掉线");
            } else {
                //没有正在游戏的话,直接剔除该用户
                roomUsers.splice(lostGameUserIndex, 1);
                utils.updateRoomToAll(room);
                //给聊天记录发送消息
                utils.chat(socket.nickname + "已经退出房间");
            }
        }
    });
    /**
     * 全局更新当前房间用户信息
     * 前端poll这个接口,只给自己发送
     */
    socket.on('updateRoom', ()=> {
        utils.updateRoomToMe(room);
    });

    /**
     * 举手准备
     */
    socket.on('toReady', () => {
        const currentUser = getUser(socket.userId);
        currentUser._status = sg_constant.user_status.ready;
        utils.updateRoomToAll(room);
        utils.chat(socket.nickname + "准备好了");
    });
    /**
     * 取消准备
     */
    socket.on('toUnready', () => {
        const currentUser = getUser(socket.userId);
        currentUser._status = sg_constant.user_status.unready;
        utils.updateRoomToAll(room);
        utils.chat(socket.nickname + "取消了准备");
    });

    /**
     * 踢人
     */
    socket.on('kick', (kickUserId)=> {
        const lostGameUserIndex = getUserIndex(kickUserId);
        if (lostGameUserIndex) {
            //直接剔除该用户
            roomUsers.splice(lostGameUserIndex, 1);
            utils.updateRoomToAllUsers(roomUsers);
            //给聊天记录发送消息
            utils.chat(socket.nickname + "被踢出房间");
        }
    });

    /**
     * 根据ID快速获取用户
     * @param userId
     */
    const getUser = (userId) => {
        for (let i = 0; i < roomUsers.length; i++) {
            if (roomUsers[i]._userId === userId) {
                return roomUsers[i];
            }
        }
    };
    /**
     * 根据ID快速获取用户索引
     * @param userId
     * @returns {*}
     */
    const getUserIndex = (userId) => {
        for (let i = 0; i < roomUsers.length; i++) {
            if (roomUsers[i]._userId === userId) {
                return i;
            }
        }
    };

};


