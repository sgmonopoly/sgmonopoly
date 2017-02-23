/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict';
/**
 * 所有地图上节点的基类
 */
class SG_Stage{
    constructor(_stageNumber,_stageType,_stageName,_des){
        this._stageNumber = _stageNumber;//序列号
        /*
        1城池,2征兵,3招将,4游乐园,5按摩院,
        6缴税,7茅庐,8金银岛,9赌馆,
        10紧急军情,11锦囊妙计,12起点
         */
        this._stageType = _stageType;
        this._picPath = "";
        this._stageName = _stageName;
        this._des = _des;
    }
}
module.exports = SG_Stage;