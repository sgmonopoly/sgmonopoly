/**
 * Created by yuanxiang on 6/14/17.
 */

import {map_info} from "./mapInfo"
import * as domHanlder from './domHanlder'

/**
 * 根据目标位置,作出需要的操作反馈
 * @param position
 */
const targetPositionFeedback = (position, userInfo) => {
    console.log('targetPositionFeedback', position, userInfo);
    const city = map_info[position];
    switch (city.stageType) {
        case 1://城池
            //TODO 以后做
            break;
        case 2://征兵
            domHanlder.showBuyTroop(userInfo.userId);
            domHanlder.showEndTurnBtn();
            break;
        case 3://招将
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
            break;
        case 10://紧急军情
            break;
        case 11://锦囊妙计
            break;
        case 12://起点
            break;
    }
};


export {targetPositionFeedback}