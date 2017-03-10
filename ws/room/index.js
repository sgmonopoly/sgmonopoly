'use strict';

const sg_constant = require("../../services/sg_constant");
const common = require("../../services/common_roomUtils");
const allRoom = require("../../services/share_variables").allRoom;

exports.init = (socket, roomIo, roomNumber, wsUtils) => {
    /**
     * 房间对象
     */
    let room = allRoom[roomNumber - 1];
    let roomUsers = room.users;//array

    /**
     * 来更新socket的用户对象,每次进入房间必须调用一次,且会发送进入房间消息
     */
    socket.on('enterRoom', (userId)=> {

        const currentUser = common.getUser(roomUsers, userId);
        if(!currentUser){
            return wsUtils.errorLog(`ID:${userId} 登入用户不存在`);
        }
        socket.userId = userId;
        socket.nickname = currentUser.nickname;
        socket.avatar = currentUser.avatar;
        currentUser.socketId = socket.id;//设置用户的socketid属性
        let chatMessage = "欢迎" + currentUser.nickname + "进入房间";
        //如果是正在游戏的房间的话,先判断是否为掉线重进的玩家
        if (room.isGaming) {
            for (let index = 0; index < roomUsers.length; i++) {
                if (roomUsers[index] && roomUsers[index].userId === userId
                    && roomUsers[index].status === sg_constant.user_status.lost) {
                    //必须是掉线状态的玩家,然后恢复他的状态
                    roomUsers[index].status = sg_constant.user_status.gaming;
                    chatMessage = currentUser.nickname + "重新连入游戏";
                    break;
                }
            }
        }

        wsUtils.updateRoomToAll(room);
        //给聊天记录发送消息
        wsUtils.chat(chatMessage);

    });
    /**
     * 退出房间(直接退出游戏)
     */
    socket.on('quitRoom', (isKick = false)=> {
        const lostGameUserIndex = common.getUserIndex(roomUsers, socket.userId);
        if (lostGameUserIndex >= 0) {
            //直接剔除该用户
            roomUsers.splice(lostGameUserIndex, 1);
            wsUtils.updateRoomToAll(room);
            //给聊天记录发送消息
            if(!isKick){
                wsUtils.chat(socket.nickname + "已经退出房间");
            }else{
                wsUtils.chat(socket.nickname + "被请出了房间");
            }

        }
    });

    /**
     * 断开事件(区分掉线和直接退出)
     */
    socket.on('disconnect', () => {
        console.log(`${socket.userId} ${socket.nickname} "断了`);

        const lostGameUserIndex = common.getUserIndex(roomUsers, socket.userId);
        console.log(`断线用户索引 ${lostGameUserIndex}`);
        if (lostGameUserIndex >= 0) {
            if (room.isGaming) {
                //正在游戏的话,设置该用户为掉线
                roomUsers[lostGameUserIndex].status = sg_constant.user_status.lost;
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
            currentUser.status = sg_constant.user_status.ready;
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
            currentUser.status = sg_constant.user_status.unready;
            wsUtils.updateRoomToAll(room);
            wsUtils.chat(socket.nickname + "取消了准备");
        }
    });

    /**
     * 踢人
     */
    socket.on('kick', (kickUserId)=> {
        const kickedUser = common.getUser(roomUsers, kickUserId);
        if (kickedUser) {
            //给被踢的人发送消息,接收之后直接调quitRoom方法
            console.log(`发送踢人消息${kickedUser.socketId}`);
            socket.to(kickedUser.socketId).emit("kicked");

            /* 这段放在调quitRoom方法了
            //直接剔除该用户
            roomUsers.splice(lostGameUserIndex, 1);
            wsUtils.updateRoomToAll(room);
            //给聊天记录发送消息
            wsUtils.chat(socket.nickname + "被踢出房间");
            */
        }
    });

    /**
     * 发送聊天记录
     */
    socket.on('addChatMessage', (message)=> {
        wsUtils.chat(message);
    });

};


