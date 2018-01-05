/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict'
const allUser = {}//所有用户,存在内存中
const USER_Info = require("../models/user_info")
const uuid = require('uuid')
const common_roomUtils = require("../services/common_roomUtils")
const sg_constant = require("../services/sg_constant")
const _ = require("lodash")
/**
 * 这是所有房间的对象
 */
let allRoom = require("../services/share_variables").allRoom

//测试账户
const testUser1 = new USER_Info("test1", "test1", "")
const testUser2 = new USER_Info("test2", "test2", "")
const testUser3 = new USER_Info("test3", "test3", "")
const testUser4 = new USER_Info("test4", "test4", "")
const testUser5 = new USER_Info("test5", "test5", "")
testUser1.password = "test1"
testUser2.password = "test2"
testUser3.password = "test3"
testUser4.password = "test4"
testUser5.password = "test5"
allUser["test1"] = testUser1
allUser["test2"] = testUser2
allUser["test3"] = testUser3
allUser["test4"] = testUser4
allUser["test5"] = testUser4

/**
 * @deprecated 暂时不用注册也能进入游戏
 * 注册
 * @param req
 * @param res
 * @returns {*}
 */
exports.register = (req, res) => {

    const nickname = req.body.nickname
    const avatar = req.body.avatar
    const password = req.body.password
    console.log("register:", nickname)

    //先根据昵称返回用户对象
    if (allUser[nickname]) {
        //如果有,则直接返回
        return res.status(400).send("用户已存在")
    }
    const newUser = new USER_Info(uuid.v1().replace(/-/g, ""), nickname, avatar)
    newUser.password = password
    allUser[nickname] = newUser

    return res.send("success")
}

/**
 * 登入
 * @param req
 * @param res
 * @returns {*}
 */
exports.loginByNickname = (req, res) => {

    const nickname = req.body.nickname
    const avatar = req.body.avatar
    console.log("login:", nickname)

    const currentUser = new USER_Info(uuid.v1().replace(/-/g, ""), nickname, avatar)

    req.session.user = currentUser
    return res.send(currentUser)
}
/**
 * 更改用户信息
 * @param req
 * @param res
 * @returns {*}
 */
exports.changeUserInfo = (req, res) => {

    const currentUser = req.session.user
    const nickname = req.body.nickname
    const avatar = req.body.avatar

    currentUser.nickname = nickname
    currentUser.avatar = avatar

    req.session.user = currentUser

    return res.send('success')
}

exports.showAllUser = (req, res) => {
    res.send(allUser)
}
/**
 * 判断当前用户是否已登入
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.checkUserIsLogin = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        return res.status(401).send("userNoLogin")
    }
}
/**
 * 判断指定用户是否掉线
 * @param req
 * @param res
 */
exports.checkIndicatedUserIsDisconnected = (req, res) => {
    const userId = req.params.userId
    if (!userId) {
        return res.status(400).send("用户ID为空")
    }

    const test = req.query.test
    if (!test) {
        for (let i = 0 ; i < allRoom.length ; i++) {
            let indicatedUser = common_roomUtils.getUser(allRoom[i].users, userId)
            //判断必须是用户掉线
            if (indicatedUser && indicatedUser.status === sg_constant.user_status.lost) {
                let roomNo = i + 1
                //返回用户掉线的房间号
                return res.send({
                    roomNo: roomNo
                })
            }
        }
    } else {
        //测试用的
        return res.send({
            roomNo: 1
        })
    }

    return res.status(401).send("用户未登入过")
}