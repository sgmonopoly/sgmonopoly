/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict';

const sg_constant = require("../services/sg_constant");
const SG_User = require("../models/sg_user");
const common = require("../services/common_roomUtils");
const _ = require("lodash");
const schedule = require("node-schedule");
/**
 * 这是所有房间的对象
 */
let allRoom = require("../services/share_variables").allRoom;

/**
 * 进入房间
 * @param req
 * @param res
 * @returns {*}
 */
exports.enter = (req, res) => {
    const currentUser = req.session.user;
    const roomNumber = parseInt(req.params.roomNumber);
    console.log("进房", roomNumber, "当前用户", currentUser);

    if (sg_constant.roomNumbers.indexOf(roomNumber) < 0) {
        return res.status(400).send("房间号不正确");
    }

    const room = allRoom[roomNumber - 1];
    //先判断,房间内是否已经有了这个人(断线重连)
    let ifReconnected = false;
    for (let i = 0; i < room.users.length; i++) {
        if (room.users[i].userId === currentUser.userId) {
            ifReconnected = true;
            break;
        }
    }
    //检测房间是否满
    if (!ifReconnected && room.currentNum >= 4) {
        return res.status(402).send("房间已满");
    }

    //判断用户是否在其他房间内,有则踢掉
    const ifKick = kickUserFromRooms(currentUser.userId);

    const statusCode = ifKick ? 201 : 200;

    //如果没人,要设置房主
    if (room.currentNum === 0) {
        room.hostId = currentUser.userId;
        room.hostNickname = currentUser.nickname;
    }

    room.users.push(new SG_User(currentUser.userId, currentUser.nickname, currentUser.avatar));
    room.currentNum = room.users.length;

    console.log("allRoom:", allRoom);

    return res.status(statusCode).send("success");
};

/**
 * 退出房间
 * @param req
 * @param res
 * @returns {*}
 */
/*
 exports.quit = (req, res) => {

 const currentUser = req.session.user;
 const roomNumber = parseInt(req.params.roomNumber);
 console.log("退房", roomNumber, "当前用户", currentUser);

 if (sg_constant.roomNumbers.indexOf(roomNumber) < 0) {
 return res.status(400).send("房间号不正确");
 }

 const room = allRoom[roomNumber - 1];

 if (room._currentNum > 0) {
 const lostGameUserIndex = common.getUserIndex(room._users, currentUser._userId);
 if (lostGameUserIndex >= 0) {
 room._users.splice(lostGameUserIndex, 1);
 }
 room._currentNum = room._users.length;
 //房主检测
 common.checkAndResetRoomHost(room, currentUser._userId);
 }

 console.log(allRoom);

 return res.send("success");
 };
 */
let roomShowData;
/**
 * 显示所有房间
 * @param req
 * @param res
 * @returns {*}
 */
exports.showAll = (req, res) => {
    //由于用了定时任务,这里只需要直接返回即可
    return res.send(roomShowData);
};

/**
 * 显示1个房间
 * @param req
 * @param res
 * @returns {*}
 */
exports.show = (req, res) => {
    const roomNumber = parseInt(req.params.roomNumber);
    const room = allRoom[roomNumber - 1];
    return res.send(room);
};

/**
 * 从所有房间中,选出一名用户的所在位置,再删掉他
 * @param userId
 */
const kickUserFromRooms = (userId) => {
    let ifKick = false;
    for (let i = 0; i < allRoom.length; i++) {

        let room = allRoom[i];
        let indexUser = -1;
        for (let j = 0; j < room.users.length; j++) {
            if (userId === room.users[j].userId) {
                //找到该用户
                console.log(`${userId}该用户已在其他房间登入,位置${i} ${j}`);
                indexUser = j;
                break;
            }
        }
        if (indexUser >= 0) {
            //找到后,删除该用户,并更新当前人数
            room.users.splice(indexUser, 1);
            room.currentNum = room.users.length;
            ifKick = true;

            //房主检测
            common.checkAndResetRoomHost(room, userId);

            break;
        }
    }
    return ifKick;
};

const filterRoomUserData = allRoom => {
    for (let i = 0; i < allRoom.length; i++) {
        for (let j = 0; j < allRoom[i].users.length; j++) {
            allRoom[i].users[j] = _.omit(allRoom[i].users[j], "money", "troop", "citys",
                "cityCount", "cardCount", "order", "suspended", "socketId");
        }
    }
};

/**
 * 更新所有房间信息到一个对象中
 */
const updateRoomUserData = () => {
    const allRoomClone = _.cloneDeep(allRoom);
    roomShowData = filterRoomUserData(allRoomClone);
};


/**
 * 定时执行 更新房间信息任务 每5秒触发
 */
const startJob = ()=> {
    schedule.scheduleJob('*/5 * * * * *', function () {
        updateRoomUserData();
    });
};
startJob();