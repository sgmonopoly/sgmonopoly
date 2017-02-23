/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict';
class SG_Hero {
    constructor(){
        this._heroName = "";//武将姓名
        this._suit = 0;//花色(1红桃<2黑桃<3方块<4梅花<1红桃)
        this._point = 0;//牌点数(1~13点,14小王,15大王)
        this._atk = 0;//攻击力
        this._def = 0;//防御力
        this._heroType = 0;//武将类型(1人物,2武器,3阵式,4霸王)
        this._duty = 0;//如果武将类型是人物的话,还分职务(1君主,2武将,3军师)
        this._picPath = "";//图片路径
        this._des = "";//描述
    }
}
module.exports = SG_Hero;