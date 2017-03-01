/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict';
const nicknameList = new Set();

/**
 * 登入
 * 这个方法在成功返回后,前端需调用
 * socket.emit('changeUserInfo',nickname,avatar);
 * 来更新socket信息(昵称和头像)
 * @param req
 * @param res
 * @returns {*}
 */
exports.loginByNickname = (req, res) => {

    const _nickname = req.body.nickname;
    console.log("login:",_nickname);
    if (nicknameList.has(_nickname)) {
        return res.status(400).send('此昵称已被人使用');
    }
    nicknameList.add(_nickname);
    return res.send('success');
};
/**
 * 更改用户信息
 * 这个方法在成功返回后,前端需调用
 * socket.emit('changeUserInfo',nickname,avatar);
 * 来更新socket信息(昵称和头像)
 * @param req
 * @param res
 * @returns {*}
 */
exports.changeUserInfo = (req, res) => {

    const _oldNickname = req.body.oldNickname;
    const _nickname = req.body.nickname;

    if (_oldNickname !== _nickname && nicknameList.has(_nickname)) {
        return res.send(400,'此昵称已被人使用');
    }
    nicknameList.delete(_oldNickname);
    nicknameList.add(_nickname);
    return res.send('success');
};
/**
 * 获取在线人数
 * @param req
 * @param res
 */
exports.onlineCount = (req, res) => {
    res.send(nicknameList.size+'');
};