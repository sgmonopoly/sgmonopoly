/**
 * Created by yuanxiang on 3/3/17.
 * 在线用户对象
 */
'use strict'
class USER_Info {
    constructor(_userId, _nickname, _avatar) {
        this.userId = _userId
        this.nickname = _nickname
        this.avatar = _avatar
    }
}
module.exports = USER_Info