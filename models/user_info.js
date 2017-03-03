/**
 * Created by yuanxiang on 3/3/17.
 * 在线用户对象
 */
'use strict';
class USER_Info {
    constructor(_userId, _nickname, _avatar) {
        this._userId = _userId;
        this._nickname = _nickname;
        this._avatar = _avatar;
    }
}
module.exports = USER_Info;