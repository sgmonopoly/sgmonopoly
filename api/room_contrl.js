/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict';
const roomNamePrefix = "room";//默认返回的房间对象中,可能会包含自带属性,用这个名称来过滤房间对象
const GAME_Room = require("../models/game_room");

/**
 * 暂时只有2个房间,以后再加
 */
const roomNumbers = [1, 2];
/**
 * 这是所有房间的对象
 */
let allRoom = [];

roomNumbers.forEach(roomNumber => {
    allRoom.push(new GAME_Room(roomNamePrefix + roomNumber, '', '', [], 0));
});

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

    if (roomNumbers.indexOf(roomNumber) < 0) {
        return res.status(400).send("房间号不正确");
    }

    const room = allRoom[roomNumber - 1];
    if (room._currentNum >= 4) {
        return res.status(401).send("房间已满");
    }

    //判断用户是否在其他房间内,有则踢掉
    const ifKick = kickUserFromRooms(currentUser._userId);

    const statusCode = ifKick ? 201 : 200;

    //如果没人,要设置房主
    if (room._currentNum === 0) {
        room._hostId = currentUser._userId;
        room._hostNickname = currentUser._nickname;
    }

    room._users.push(currentUser);
    room._currentNum = room._users.length;

    console.log(allRoom);

    return res.status(statusCode).send("success");
};

/**
 * 退出房间
 * @param req
 * @param res
 * @returns {*}
 */
exports.quit = (req, res) => {

    const currentUser = req.session.user;
    const roomNumber = parseInt(req.params.roomNumber);
    console.log("退房", roomNumber, "当前用户", currentUser);

    if (roomNumbers.indexOf(roomNumber) < 0) {
        return res.status(400).send("房间号不正确");
    }

    const room = allRoom[roomNumber - 1];

    if (room._currentNum > 0) {
        room._users = room._users.filter(item => item._userId !== currentUser._userId);
        room._currentNum = room._users.length;
        //房主检测
        checkAndResetRoomHost(room, currentUser._userId);
    }

    console.log(allRoom);

    return res.send("success");
};

/**
 * 显示所有房间
 * @param req
 * @param res
 * @returns {*}
 */
exports.showAll = (req, res) => {
    return res.send(allRoom);
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
        for (let j = 0; j < room._users.length; j++) {
            if (userId === room._users[j]._userId) {
                //找到该用户
                console.log("userId该用户已在其他房间登入,位置", i, " ", j);
                indexUser = j;
                break;
            }
        }
        if (indexUser >= 0) {
            //找到后,删除该用户,并更新当前人数
            room._users.splice(indexUser, 1);
            room._currentNum = room._users.length;
            ifKick = true;

            //房主检测
            checkAndResetRoomHost(room, userId);

            break;
        }
    }
    return ifKick;
};
/**
 * 房间检测,没有人就取消房主,还有人则选第一个人自动当房主
 * @param room
 * @param currentUserId
 */
const checkAndResetRoomHost = (room, currentUserId) => {

    if (room._currentNum === 0) {
        //如果房间没人取消房主
        room._hostId = '';
        room._hostNickname = '';
    } else if (room._currentNum > 0 && currentUserId === room._hostId) {
        //检测当前用户是否为原房主,是的话,则房间易主
        room._hostId = room._users[0]._userId;
        room._hostNickname = room._users[0]._nickname;
    }
};