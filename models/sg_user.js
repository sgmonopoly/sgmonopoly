/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict';
class SG_User extends require("./user_info") {
    constructor(_userId, _nickname, _avatar, _money = 18000, _troop = 2000) {
        super(_userId, _nickname, _avatar);
        this.money = _money;//默认金额18000
        this.troop = _troop;//默认兵力2000
        this.citys = [];//占有的城池
        this.cityCount = 0;//城池数
        this.heroCount = 0;//武将数
        this.order = 0;//顺序(1,2,3,4)
        this.suspended = 0;//0不暂停,其他数字为暂停轮数
        this.status = 1;//状态 1未准备,2已准备,3开战,4掉线
        this.socketId = "";
    }
}
module.exports = SG_User;