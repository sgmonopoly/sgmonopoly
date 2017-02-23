/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict';
const sg_constant = require("../services/sg_constant");

class SG_City extends require('./sg_stage') {
    constructor(_stageNumber, _stageType, _cityName, _des, _occupyPrice, _buildPrice,
                _colorFollow, _cityType = 1, sameColorCityCount) {
        super(_stageNumber, _stageType, _cityName, _des);
        this._ownerId = "";
        this._occupyPrice = _occupyPrice;//占领地价格
        this._buildPrice = _buildPrice;//建城费
        this._colorFollow = _colorFollow;//相同颜色区分(1~5,6是古战场)
        this._cityType = _cityType;//1普通,2小城,4大城
        this._toll = 0;//过路费(调用getToll来返回这个值)
        this._tax1 = this._occupyPrice / 2;//基数为领地价格的一半,普通为基数,小城为基数2倍,大城为基数4倍
        this._tax2 = this._occupyPrice;
        this._tax3 = this._occupyPrice * 2;
        this.getToll(sameColorCityCount);
    }

    /**
     * 根据相同颜色的城池数量,返回过路费
     * @param sameColorCityCount
     * @returns {number|*}
     */
    getToll(sameColorCityCount = 1) {
        if (this._colorFollow === sg_constant.city_follow.ancient) {
            //古战场,每多一个相同颜色,价格根据500翻倍
            this._toll = 500 * Math.pow(2, sameColorCityCount - 1);
        } else {
            switch (this._cityType) {
                case (sg_constant.city_type.normal) :
                    this._toll = this._tax1;
                    break;
                case (sg_constant.city_type.small) :
                    this._toll = this._tax2;
                    break;
                case (sg_constant.city_type.big) :
                    this._toll = this._tax3;
                    break;
            }
            if (sameColorCityCount === 4) {
                //一般城池,要全部4个相同颜色,才翻倍
                this._toll = this._toll * 2;
            }
        }
        return this._toll;
    }

}
module.exports = SG_City;