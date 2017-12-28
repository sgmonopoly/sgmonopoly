/**
 * Created by yuanxiang on 6/14/17.
 */

import {map_info} from "../domain/MapInfo"
import * as domHanlder from './DomHanlder'
import myUserId from '../domain/LocalData'
import {roomAction,gameAction} from "../network"

/**
 * 根据目标位置,作出需要的操作反馈
 * @param startPosition
 * @param endPosition
 * @param userInfo
 */
const targetPositionFeedback = (startPosition, endPosition, userInfo) => {
    console.log('targetPositionFeedback', endPosition, userInfo);
    if (myUserId !== userInfo.userId) {
        //只对当前玩家生效
        return;
    }
    const city = map_info[endPosition];

    if(startPosition > endPosition && endPosition != 1){
        //如果过了起点,且终点并不是起点,给2000
        gameAction.passByStart();
    }

    switch (city.stageType) {
        case 1://城池
            gameAction.inCity(endPosition);
            break;
        case 2://征兵
            domHanlder.showBuyTroop();
            break;
        case 3://招将
            domHanlder.showBuyHero();
            break;
        case 4://游乐园
            gameAction.inPark();
            break;
        case 5://按摩院
            gameAction.inMassage();
            break;
        case 6://缴税
            gameAction.inTax();
            break;
        case 7://茅庐
            gameAction.inCottage();
            break;
        case 8://金银岛
            gameAction.inIsland();
            break;
        case 9://赌馆
            gameAction.inBet();
            domHanlder.showBet();
            break;
        case 10://紧急军情
            //调试用
            const defaultSituation = domHanlder.getDefaultSituation();
            gameAction.inSituation(defaultSituation);
            break;
        case 11://锦囊妙计
            const defaultSuggestion = domHanlder.getDefaultSuggestion()
            gameAction.inSuggestion(defaultSuggestion);
            break;
        case 12://起点
            gameAction.inStart();
            break;
    }

};
/**
 * 后端通知前端任务结束时,调用的回调
 * @param overType
 */
const eventOverCallback = (overType) => {
    console.log('eventOverCallback', overType);
    switch (overType) {
        case 1://城池
            //TODO 以后做
            break;
        case 2://征兵
            domHanlder.hideBuyTroop();
            break;
        case 3://招将
            domHanlder.hideBuyHero();
            break;
        case 4://游乐园
            break;
        case 5://按摩院
            break;
        case 6://缴税
            break;
        case 7://茅庐
            break;
        case 8://金银岛
            break;
        case 9://赌馆
            domHanlder.hideBet();
            break;
        case 10://紧急军情
            break;
        case 11://锦囊妙计
            break;
        case 12://起点
            break;
        case "buyCityOver"://购买城市结束
            domHanlder.hideBuyCity();
            break;
        case "upgradeCityOver"://升级城市结束
            domHanlder.hideUpgradeCity();
            break;
        case "payTollOver"://付过路费结束
            domHanlder.hidePaytollOrAttack();
            break;
    }
    domHanlder.showEndTurnBtn();
};

export {targetPositionFeedback, eventOverCallback}