/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict';
const allUser = {};//所有用户,存在内存中
const USER_Info = require("../models/user_info");
let commonId = 1;
/**
 * 登入
 * @param req
 * @param res
 * @returns {*}
 */
exports.loginByNickname = (req, res) => {

    const _nickname = req.body.nickname;
    const _avatar = req.body.avatar;
    console.log("login:", _nickname);

    //先根据昵称返回用户对象
    if (allUser[_nickname]) {
        //如果有,则直接返回
        return res.send(allUser[_nickname]);
    }
    const newUser = new USER_Info(commonId++, _nickname, _avatar);
    allUser[_nickname] = newUser;

    req.session.user = newUser;

    return res.send(newUser);
};
/**
 * 更改用户信息
 * @param req
 * @param res
 * @returns {*}
 */
exports.changeUserInfo = (req, res) => {

    const _oldNickname = req.body.oldNickname;
    const _nickname = req.body.nickname;
    const _avatar = req.body.avatar;

    if (_oldNickname !== _nickname && allUser[_nickname]) {
        return res.status(400).send('此昵称已被人使用');
    }
    const oldUserId = allUser[_oldNickname]._userId;
    delete allUser[_oldNickname];
    allUser[_nickname] = new USER_Info(oldUserId, _nickname, _avatar);
    return res.send('success');
};

exports.showAllUser = (req, res) => {
    res.send(allUser);
};
/**
 * 判断用户是否已登入
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.checkUserIsLogin = (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        return res.status(401).send("userNoLogin");
    }

};