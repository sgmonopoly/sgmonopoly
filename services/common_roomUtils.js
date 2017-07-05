/**
 * Created by yuanxiang on 3/8/17.
 */
const _ = require("lodash");
const sg_constant = require("../services/sg_constant");
const heroInfo = require("../models/card_info");
/**
 * 根据ID快速获取用户
 * @param roomUsers
 * @param userId
 */
exports.getUser = (roomUsers, userId) => {
    for (let i = 0; i < roomUsers.length; i++) {
        if (roomUsers[i].userId == userId) {
            return roomUsers[i];
        }
    }
};
/**
 * 根据ID快速获取用户索引
 * @param roomUsers
 * @param userId
 * @returns {*}
 */
exports.getUserIndex = (roomUsers, userId) => {
    for (let i = 0; i < roomUsers.length; i++) {
        if (roomUsers[i].userId == userId) {
            return i;
        }
    }
};
/**
 * 获得武将的信息
 * @param roomUsers
 * @param userId
 * @returns {*}
 */
exports.getHero = (heroId) => {
    return heroInfo[heroId];
};
/**
 * 房间检测,没有人就取消房主,还有人则选第一个人自动当房主
 * @param room
 * @param currentUserId
 */
exports.checkAndResetRoomHost = (room, currentUserId) => {

    console.log("checkAndResetRoomHost");
    console.log(room);
    console.log(currentUserId);
    if (room.currentNum === 0) {
        //如果房间没人取消房主
        room.hostId = '';
        room.hostNickname = '';
    } else if (room.currentNum > 0 && currentUserId == room.hostId) {
        //检测当前用户是否为原房主,是的话,则房间易主
        room.hostId = room.users[0].userId;
        room.hostNickname = room.users[0].nickname;
    }
};

/**
 * 洗牌,返回一个最大值为maxNum的随机数组
 * @param maxNum
 */
exports.createShuffledArray = maxNum => {
    let array = [];
    _.times(maxNum, function (n) {
        array.push(++n);
    });
    return _.shuffle(array);
};

/**
 * 判断用户是否为房间内的游戏用户,通过socketId来判断,避免额外连接进来的客户端
 * @param roomUsers
 * @param socketId
 * @returns {Boolean}
 */
exports.checkValidUser = (roomUsers, socketId) => {
    if (!sg_constant.saveCheck) return true;
    for (let i = 0; i < roomUsers.length; i++) {
        if (roomUsers[i].socketId == socketId) {
            return true;
        }
    }
    return false;
};