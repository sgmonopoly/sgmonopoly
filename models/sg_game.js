/**
 * Created by yuanxiang on 3/15/17.
 */
class SG_Game {
    constructor() {
        this.cardOrders = [];//卡片顺序(洗牌)
        this.situationOrders = [];//紧急军情顺序(洗牌)
        this.suggestionOrder = [];//锦囊妙计顺序(洗牌)
        this.currentUserIndex = 0;//目前的用户索引
        this.diceRange = [0,1,1,2,2,3,3,4,4,5,5,6,6];//骰子范围0-6
    }
}
module.exports = SG_Game;