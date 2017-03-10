/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict';
const allUser = {};//所有用户,存在内存中
const USER_Info = require("../models/user_info");
const uuid = require('uuid');
const common_roomUtils = require("../services/common_roomUtils");
const sg_constant = require("../services/sg_constant");
const _ = require("lodash");
/**
 * 这是所有房间的对象
 */
let allRoom = require("../services/share_variables").allRoom;

/**
 * 注册
 * @param req
 * @param res
 * @returns {*}
 */
exports.register = (req, res) => {

    const nickname = req.body.nickname;
    const avatar = req.body.avatar;
    const password = req.body.password;
    console.log("register:", nickname);

    //先根据昵称返回用户对象
    if (allUser[nickname]) {
        //如果有,则直接返回
        return res.status(400).send("用户已存在");
    }
    const newUser = new USER_Info(uuid.v1().replace(/-/g, ""), nickname, avatar);
    newUser.password = password;
    allUser[nickname] = newUser;

    return res.send("success");
};

/**
 * 登入
 * @param req
 * @param res
 * @returns {*}
 */
exports.loginByNickname = (req, res) => {

    const nickname = req.body.nickname;
    const password = req.body.password;
    console.log("login:", nickname);

    //先根据昵称返回用户对象
    const user = allUser[nickname];
    if (user) {
        if(user.password != password){
            return res.status(400).send("密码不正确");
        }
        const currentUser = new USER_Info(user.userId, user.nickname, user.avatar);
        //密码正确则直接返回
        req.session.user = currentUser;
        return res.send(currentUser);
    }
    return res.status(401).send("无此用户");
};
/**
 * 更改用户信息
 * @param req
 * @param res
 * @returns {*}
 */
exports.changeUserInfo = (req, res) => {

    const oldNickname = req.session.user.nickname;
    const nickname = req.body.nickname;
    const avatar = req.body.avatar;

    if (oldNickname !== nickname && allUser[nickname]) {
        return res.status(400).send('此昵称已被人使用');
    }
    const oldUserId = allUser[oldNickname].userId;
    const oldPwd = allUser[oldNickname].password;
    delete allUser[oldNickname];
    allUser[nickname] = new USER_Info(oldUserId, nickname, avatar);
    allUser[nickname].password = oldPwd;

    return res.send('success');
};

exports.showAllUser = (req, res) => {
    res.send(allUser);
};
/**
 * 判断当前用户是否已登入
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.checkUserIsLogin = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        return res.status(401).send("userNoLogin");
    }
};
/**
 * 判断指定用户是否掉线
 * @param req
 * @param res
 */
exports.checkIndicatedUserIsDisconnected = (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).send("用户ID为空");
    }

    const test = req.query.test;
    if (!test) {
        for (let i = 0; i < allRoom.length; i++) {
            let indicatedUser = common_roomUtils.getUser(allRoom[i].users, userId);
            //判断必须是用户掉线
            if (indicatedUser && indicatedUser.status === sg_constant.user_status.lost) {
                let roomNo = i + 1;
                //返回用户掉线的房间号
                return res.send({
                    roomNo: roomNo
                });
            }
        }
    } else {
        //测试用的
        return res.send({
            roomNo: 1
        });
    }

    return res.status(401).send("用户未登入过");
};