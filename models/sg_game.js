/**
 * Created by yuanxiang on 3/15/17.
 */
class SG_Game {
    constructor() {
        this.cardOrders = [];//卡片顺序(洗牌)
        this.situationOrders = [];//紧急军情顺序(洗牌)
        this.suggestionOrder = [];//锦囊妙计顺序(洗牌)
        this.currentUserIndex = 0;//目前的用户索引
    }
}
module.exports = SG_Game;