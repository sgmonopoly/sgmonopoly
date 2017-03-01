/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict';
class SG_User{
    constructor(_userId, _nickname, _avatar, _money = 18000,_troop = 2000){
        this._userId = _userId;//用户ID,socketId
        this._nickname = _nickname;//昵称
        this._avatar = _avatar;//头像
        this._money = _money;//默认金额18000
        this._troop = _troop;//默认兵力2000
        this._citys = [];//占有的城池
        this._cityCount = this._citys.length;//城池数
        this._heroCount = 0;//武将数
        this._order = 0;//顺序(1,2,3,4)
        this._suspended = 0;//0不暂停,其他数字为暂停轮数
        this._status = 1;//状态 1为准备,2已准备,3开战,4掉线
    }
}
module.exports = SG_User;