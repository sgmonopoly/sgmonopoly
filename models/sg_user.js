/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict';
class SG_User extends require("./user_info") {
    constructor(_userId, _nickname, _avatar, _money = 18000, _troop = 2000) {
        super(_userId, _nickname, _avatar);
        this._money = _money;//默认金额18000
        this._troop = _troop;//默认兵力2000
        this._citys = [];//占有的城池
        this._cityCount = 0;//城池数
        this._heroCount = 0;//武将数
        this._order = 0;//顺序(1,2,3,4)
        this._suspended = 0;//0不暂停,其他数字为暂停轮数
        this._status = 1;//状态 1未准备,2已准备,3开战,4掉线
        this._socketId = "";
    }
}
module.exports = SG_User;