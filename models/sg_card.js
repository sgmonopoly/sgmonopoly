/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict';
class SG_Hero {
    constructor(cardId, cardName, _suit, _point, _atk, _def, cardType, _duty, _picPath, _des) {
        this.cardId = cardId;//卡牌ID
        this.cardName = cardName;//卡牌名称
        this.suit = _suit;//花色(1红桃<2黑桃<3方块<4梅花<1红桃)
        this.point = _point;//牌点数(1~13点,14小王,15大王)
        this.atk = _atk;//攻击力
        this.def = _def;//防御力
        this.cardType = cardType;//武将类型(1人物,2武器,3阵式,4霸王)
        this.duty = _duty;//如果武将类型是人物的话,还分职务(1君主,2武将,3军师)
        this.picPath = _picPath;//图片路径
        this.des = _des;//描述
    }
}
module.exports = SG_Hero;