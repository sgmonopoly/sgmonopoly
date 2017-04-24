/**
 * Created by yuanxiang on 3/15/17.
 */
const map_info = require("./map_info");
const _ = require("lodash");
const sg_constant = require("../services/sg_constant");
const common = require("../services/common_roomUtils");

/**
 * 本局游戏的一些属性
 */
class SG_Game {

    constructor() {
        this.cardOrders = common.createShuffledArray(sg_constant.item_count.card);//卡片顺序(洗牌)
        this.situationOrders = common.createShuffledArray(sg_constant.item_count.situation);//紧急军情顺序(洗牌)
        this.suggestionOrder = common.createShuffledArray(sg_constant.item_count.suggestion);//锦囊妙计顺序(洗牌)
        this.currentUserIndex = -1;//目前的用户索引(默认-1,则第一轮从(-1 + 1 = 0)的索引处开始)
        this.diceRange = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];//骰子范围0-6,降低0出现的概率故意少1个
        this.gameCitys = {};//本局比赛的所有城市对象
        this.turn = 0;//当前轮次
        this.initCity();//初始化城市方法
    }

    initCity() {
        for (let i in map_info) {
            const stage = map_info[i];
            if (stage.stageType === sg_constant.stage_type.city) {
                const cloneStage = _.cloneDeep(stage);
                cloneStage.ownerId = "";
                cloneStage.ownerNickname = "";
                cloneStage.cityType = sg_constant.city_type.normal;//默认normal城
                cloneStage.toll = this.getToll(cloneStage);//过路费
                this.gameCitys[i] = cloneStage;
            }
        }
    }

    /**
     * 根据ID返回城市对象
     * @param stageId
     * @returns {*}
     */
    getCity(stageId){
        return this.gameCitys[stageId];
    }

    /**
     * 根据相同颜色的城池数量,返回过路费
     * @param sameColorCityCount
     * @returns {number|*}
     */
    getToll(city, sameColorCityCount = 1) {
        let toll = 0;
        if (city.colorFollow === sg_constant.city_follow.ancient) {
            //古战场,每多一个相同颜色,价格根据500翻倍
            toll = 500 * Math.pow(2, sameColorCityCount - 1);
        } else {
            switch (city.cityType) {
                case (sg_constant.city_type.normal) :
                    toll = city.tax1;
                    break;
                case (sg_constant.city_type.small) :
                    toll = city.tax2;
                    break;
                case (sg_constant.city_type.big) :
                    toll = city.tax3;
                    break;
            }
            if (sameColorCityCount === 4) {
                //一般城池,要全部4个相同颜色,才翻倍
                toll = toll * 2;
            }
        }
        return toll;
    }

    /**
     * 占领城市
     * PS,这是空间换时间的做法
     * @param user
     * @param stageId
     */
    occupyCity(user, city) {
        //用户占有属性增加一个城市
        user.citys.push(city.stageId);
        //更新该城市相同颜色的其他城市的过路费
        //const city = this.getCity(stageId);
        //设置占领者属性
        city.ownerId = user.userId;
        city.ownerNickname = user.nickname;
        this.updateCityToll(user, city);
    }
    /**
     * 失去城市,交换城市时,为了避免ownerId冲突,必须先执行lostCity再执行occupyCity
     * PS,这是空间换时间的做法
     * @param user
     * @param stageId
     */
    lostCity(user, city) {
        //移除一个城市
        user.citys = _.without(user.citys, city.stageId);
        //const city = this.getCity(stageId);
        //设置占领者属性
        city.ownerId = "";
        city.ownerNickname = "";
        this.updateCityToll(user, city);
    }

    /**
     * 升级城市
     * @param user
     * @param stageId
     */
    upgradeCity(user, city) {
        //const city = this.getCity(stageId);
        if(city.cityType < sg_constant.city_type.big){//大城不需要升级
            city.cityType = city.cityType + 1;
            this.updateCityToll(user, city);
        }
    }

    /**
     * 降级城市
     * @param user
     * @param stageId
     */
    degradeCity(user, city) {
        //onst city = this.getCity(stageId);
        if(city.cityType > sg_constant.city_type.normal){//normal城不需要降级
            city.cityType = city.cityType - 1;
            this.updateCityToll(user, city);
        }
    }

    /**
     * 更新城市过路费
     * @param user
     * @param sourceCity
     */
    updateCityToll(user, sourceCity) {
        const colorFollow = sourceCity.colorFollow;

        //获取相同颜色的数量
        const sameColorFollowCount = _.filter(user.citys, id => {
            return colorFollow === this.getCity(id).colorFollow;
        }).length;
        //则根据该数量更新过路费
        if(sameColorFollowCount > 0){
            user.citys.forEach(id => {
                const tempCity = this.getCity(id);
                if (colorFollow === tempCity.colorFollow) {
                    tempCity.toll = this.getToll(tempCity, sameColorFollowCount);
                }
            });
        }
    }
}

module.exports = SG_Game;