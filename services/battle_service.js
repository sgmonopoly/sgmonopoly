/**
 * Created by yuanxiang on 3/8/17.
 */
const _ = require("lodash");
const common = require("./common_roomUtils");
const sg_constant = require("../services/sg_constant");

/**
 * 开始攻城
 * @param battleInfo
 * @param roomUsers
 * @param gameInfo
 */
exports.startBattle = (battleInfo, roomUsers, gameInfo) => {
    console.log("startBattle", battleInfo);
    const {atkHeroId, defHeroId} = battleInfo;
    const atkHero = common.getHero(atkHeroId);
    const defHero = common.getHero(defHeroId);

    let messages = [];
    messages.push(`进攻方${battleInfo.atkUserName}派出${atkHero.cardName},攻击力${atkHero.atk}`);
    messages.push(`防守方${battleInfo.defUserName}派出${defHero.cardName},防御力${defHero.def}`);

    const result = compareHero(atkHero, defHero);

    const resultCn = {
        "atk": "进攻方胜利",
        "def": "防守方胜利",
        "draw": "平局"
    };

    messages.push(`结果为${resultCn[result.winner]},开始结算`);

    battleSummary(result, battleInfo, roomUsers, gameInfo, messages);

    return messages;
};

/**
 * 比较武将
 * @param atkHero
 * @param defHero
 * @returns {{}}
 */
const compareHero = (atkHero, defHero) => {
    const result = {atkHero, defHero};
    //1,先判断霸王卡
    if (sg_constant.hero_type.bigboss === atkHero.cardType && sg_constant.hero_type.bigboss !== defHero.cardType) {
        result.winner = "atk";
        result.handler = sg_constant.battle_result.prefect;//赢得人不损失,且占有对方兵力,武将,城池
        return result;
    }
    if (sg_constant.hero_type.bigboss === defHero.cardType && sg_constant.hero_type.bigboss !== atkHero.cardType) {
        result.winner = "def";
        result.handler = sg_constant.battle_result.prefect;//赢得人不损失,且占有对方兵力,武将
        return result;
    }
    if (sg_constant.hero_type.bigboss === defHero.cardType && sg_constant.hero_type.bigboss === atkHero.cardType) {
        result.winner = "draw";
        result.handler = sg_constant.battle_result.drawWithNoLoss;//只将双方武将归还国库
        return result;
    }
    //2,判断阵式卡
    //(1)军师秒杀阵式
    if (sg_constant.hero_type.formation === atkHero.cardType && sg_constant.hero_duty.strategy === defHero.duty) {
        result.winner = "def";
        result.handler = sg_constant.battle_result.victory;//赢得人不损失,输的人损失兵力,武将被俘虏
        return result;
    }
    if (sg_constant.hero_type.formation === defHero.cardType && sg_constant.hero_duty.strategy === atkHero.duty) {
        result.winner = "atk";
        result.handler = sg_constant.battle_result.victory;//赢得人不损失,且占有城池,输的人损失兵力和武将,
        return result;
    }
    //(2)和武器平手
    if ((sg_constant.hero_type.formation === atkHero.cardType && sg_constant.hero_type.weapon === defHero.cardType) ||
        (sg_constant.hero_type.formation === defHero.cardType && sg_constant.hero_type.weapon === atkHero.cardType)) {
        result.winner = "draw";
        result.handler = sg_constant.battle_result.drawWithNoLoss;//只将双方武将归还国库
        return result;
    }
    //(3)完胜君主和一般武将
    if (sg_constant.hero_type.formation === defHero.cardType && sg_constant.hero_type.person === atkHero.cardType) {
        result.winner = "def";
        result.handler = sg_constant.battle_result.victory;//赢得人不损失,输的人损失兵力,武将被俘虏,
        return result;
    }
    if (sg_constant.hero_type.formation === atkHero.cardType && sg_constant.hero_type.person === defHero.cardType) {
        result.winner = "atk";
        result.handler = sg_constant.battle_result.victory;//赢得人不损失,且占有城池,输的人损失兵力和武将,
        return result;
    }

    //3 判断武器卡
    if (sg_constant.hero_type.weapon === atkHero.cardType || sg_constant.hero_type.weapon === defHero.cardType) {
        result.winner = "draw";
        result.handler = sg_constant.battle_result.drawWithLoss;//双方武将归还国库,且损失兵力
        return result;
    }

    //4 一般武将
    if (atkHero.atk > defHero.def) {
        result.winner = "atk";
        result.handler = sg_constant.battle_result.littleBeat;//双方损失兵力,赢的人占有城池,输的人损失兵力和武将,
        return result;
    } else if (atkHero.atk < defHero.def) {
        result.winner = "def";
        result.handler = sg_constant.battle_result.littleBeat;//双方损失兵力,输的人损失兵力,武将被俘虏,
        return result;
    } else {
        result.winner = "draw";
        result.handler = sg_constant.battle_result.drawWithLoss;//双方武将归还国库,且损失兵力
        return result;
    }

};
/**
 * 攻城结算
 * @param result
 * @param battleInfo
 * @param roomUsers
 * @param gameInfo
 */
const battleSummary = (result, battleInfo, roomUsers, gameInfo, messages) => {
    const {winner, handler} = result;
    const atkUser = common.getUser(roomUsers, battleInfo.atkUserId);
    const defUser = common.getUser(roomUsers, battleInfo.defUserId);

    switch (handler) {
        case sg_constant.battle_result.drawWithNoLoss :
            //只将双方武将归还国库
            removeHero(atkUser, battleInfo.atkHeroId);
            removeHero(defUser, battleInfo.defHeroId);
            addHeroToBank(battleInfo.atkHeroId, gameInfo);
            addHeroToBank(battleInfo.defHeroId, gameInfo);

            messages.push(`进攻方${battleInfo.atkUserName}失去武将${result.atkHero.cardName}`);
            messages.push(`武将${result.atkHero.cardName}已归还国库`);

            messages.push(`防守方${battleInfo.defUserName}失去武将${result.defHero.cardName}`);
            messages.push(`武将${result.defHero.cardName}已归还国库`);
            break;
        case sg_constant.battle_result.drawWithLoss :
            //双方武将归还国库,且损失兵力
            removeHero(atkUser, battleInfo.atkHeroId);
            removeHero(defUser, battleInfo.defHeroId);
            addHeroToBank(battleInfo.atkHeroId, gameInfo);
            addHeroToBank(battleInfo.defHeroId, gameInfo);

            removeTroop(atkUser, battleInfo.atkConsumeTroop);
            removeTroop(defUser, battleInfo.defConsumeTroop);

            messages.push(`进攻方${battleInfo.atkUserName}失去武将${result.atkHero.cardName}`);
            messages.push(`武将${result.atkHero.cardName}已归还国库`);

            messages.push(`防守方${battleInfo.defUserName}失去武将${result.defHero.cardName}`);
            messages.push(`武将${result.defHero.cardName}已归还国库`);

            messages.push(`进攻方${battleInfo.atkUserName}损失兵力${battleInfo.atkConsumeTroop}`);
            messages.push(`防守方${battleInfo.defUserName}损失兵力${battleInfo.defConsumeTroop}`);
            break;
        case sg_constant.battle_result.prefect :
            if ("atk" === winner) {
                //进攻赢得人不损失,且占有对方兵力,武将,城池
                removeHero(defUser, battleInfo.defHeroId);
                addHeroToUser(atkUser, battleInfo.defHeroId);

                removeTroop(defUser, battleInfo.defConsumeTroop);
                addTroop(atkUser, battleInfo.defConsumeTroop);

                removeCity(defUser, battleInfo.stageId, gameInfo);
                addCityToUser(atkUser, battleInfo.stageId);

                messages.push(`防守方${battleInfo.defUserName}失去武将${result.defHero.cardName}`);
                messages.push(`进攻方${battleInfo.atkUserName}俘虏武将${result.defHero.cardName}`);

                messages.push(`防守方${battleInfo.defUserName}损失兵力${battleInfo.defConsumeTroop}`);
                messages.push(`进攻方${battleInfo.atkUserName}得到兵力${battleInfo.defConsumeTroop}`);

                messages.push(`防守方${battleInfo.defUserName}失去城池${battleInfo.cityName}`);
                messages.push(`进攻方${battleInfo.atkUserName}占领城池${battleInfo.cityName}`);

            } else {
                //守方赢得人不损失,且占有对方兵力,武将
                removeHero(atkUser, battleInfo.atkHeroId);
                addHeroToUser(defUser, battleInfo.atkHeroId);

                removeTroop(atkUser, battleInfo.atkConsumeTroop);
                addTroop(defUser, battleInfo.atkConsumeTroop);

                messages.push(`进攻方${battleInfo.atkUserName}失去武将${result.atkHero.cardName}`);
                messages.push(`防守方${battleInfo.defUserName}俘虏武将${result.atkHero.cardName}`);

                messages.push(`进攻方${battleInfo.atkUserName}损失兵力${battleInfo.atkConsumeTroop}`);
                messages.push(`防守方${battleInfo.defUserName}得到兵力${battleInfo.atkConsumeTroop}`);
            }
            break;
        case sg_constant.battle_result.victory :
            if ("atk" === winner) {
                //进攻赢得人不损失,且占有城池,输的人损失兵力和武将
                removeHero(defUser, battleInfo.defHeroId);
                addHeroToBank(battleInfo.defHeroId, gameInfo);

                removeTroop(defUser, battleInfo.defConsumeTroop);

                removeCity(defUser, battleInfo.stageId, gameInfo);
                addCityToUser(atkUser, battleInfo.stageId);

                messages.push(`防守方${battleInfo.defUserName}失去武将${result.defHero.cardName}`);
                messages.push(`武将${result.defHero.cardName}已归还国库`);

                messages.push(`防守方${battleInfo.defUserName}损失兵力${battleInfo.defConsumeTroop}`);

                messages.push(`防守方${battleInfo.defUserName}失去城池${battleInfo.cityName}`);
                messages.push(`进攻方${battleInfo.atkUserName}占领城池${battleInfo.cityName}`);
            } else {
                //防守赢得人不损失,输的人损失兵力,武将被俘虏,
                removeHero(atkUser, battleInfo.atkHeroId);
                addHeroToUser(defUser, battleInfo.atkHeroId);

                removeTroop(atkUser, battleInfo.atkConsumeTroop);

                messages.push(`进攻方${battleInfo.atkUserName}失去武将${result.atkHero.cardName}`);
                messages.push(`防守方${battleInfo.defUserName}俘虏武将${result.atkHero.cardName}`);

                messages.push(`进攻方${battleInfo.atkUserName}损失兵力${battleInfo.atkConsumeTroop}`);
            }
            break;
        case sg_constant.battle_result.littleBeat :
            //双方损失兵力
            removeTroop(atkUser, battleInfo.atkConsumeTroop);
            removeTroop(defUser, battleInfo.defConsumeTroop);

            messages.push(`进攻方${battleInfo.atkUserName}损失兵力${battleInfo.atkConsumeTroop}`);
            messages.push(`防守方${battleInfo.defUserName}损失兵力${battleInfo.defConsumeTroop}`);
            if ("atk" === winner) {
                //赢的人占有城池,输的人损失武将
                removeHero(defUser, battleInfo.defHeroId);
                addHeroToBank(battleInfo.defHeroId, gameInfo);

                removeCity(defUser, battleInfo.stageId, gameInfo);
                addCityToUser(atkUser, battleInfo.stageId);

                messages.push(`防守方${battleInfo.defUserName}失去武将${result.defHero.cardName}`);
                messages.push(`武将${result.defHero.cardName}已归还国库`);

                messages.push(`防守方${battleInfo.defUserName}失去城池${battleInfo.cityName}`);
                messages.push(`进攻方${battleInfo.atkUserName}占领城池${battleInfo.cityName}`);
            } else if ("def" === winner) {
                //输的人武将被俘虏
                removeHero(atkUser, battleInfo.atkHeroId);
                addHeroToUser(defUser, battleInfo.atkHeroId);

                messages.push(`进攻方${battleInfo.atkUserName}失去武将${result.atkHero.cardName}`);
                messages.push(`防守方${battleInfo.defUserName}俘虏武将${result.atkHero.cardName}`);
            }
            break;
    }
};

/**
 * 移除用户的武将
 * @param user
 * @param heroId
 * @param gameInfo
 */
const removeHero = (user, heroId) => {
    user.heros = _.without(user.heros, parseInt(heroId));
};

/**
 * 归还武将到国库
 * @param heroId
 * @param gameInfo
 */
const addHeroToBank = (heroId, gameInfo) => {
    gameInfo.herosOrders.push(parseInt(heroId));
    gameInfo.shuffleHero();//返回国库后,要洗牌
};

/**
 * 俘虏武将
 * @param heroId
 * @param gameInfo
 */
const addHeroToUser = (user, heroId) => {
    user.heros.push(parseInt(heroId));
};

/**
 * 占有兵力
 * @param user
 * @param consumeTroop
 */
const addTroop = (user, consumeTroop) => {
    user.troop += parseInt(consumeTroop);
};
/**
 * 消耗兵力
 * @param user
 * @param consumeTroop
 */
const removeTroop = (user, consumeTroop) => {
    user.troop -= consumeTroop;
};

/**
 * 移除用户的城池
 * @param user
 * @param stageId
 * @param gameInfo
 */
const removeCity = (user, stageId, gameInfo) => {
    user.citys = _.without(user.citys, parseInt(stageId));
    removeCityType(gameInfo, stageId);
};
/**
 * 摧毁城市上的建筑
 * @param stageId
 * @param gameInfo
 */
const removeCityType = (gameInfo, stageId) => {
    gameInfo.gameCitys[stageId].cityType = 1;
};
/**
 * 占领城池
 * @param stageId
 * @param user
 */
const addCityToUser = (user, stageId) => {
    user.citys.push(parseInt(stageId));
};