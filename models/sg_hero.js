/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict';
class SG_Hero {
    constructor(_heroName, _suit, _point, _atk, _def, _heroType, _duty, _picPath, _des) {
        this._heroName = _heroName;//武将姓名
        this._suit = _suit;//花色(1红桃<2黑桃<3方块<4梅花<1红桃)
        this._point = _point;//牌点数(1~13点,14小王,15大王)
        this._atk = _atk;//攻击力
        this._def = _def;//防御力
        this._heroType = _heroType;//武将类型(1人物,2武器,3阵式,4霸王)
        this._duty = _duty;//如果武将类型是人物的话,还分职务(1君主,2武将,3军师)
        this._picPath = _picPath;//图片路径
        this._des = _des;//描述
    }
}
module.exports = SG_Hero;