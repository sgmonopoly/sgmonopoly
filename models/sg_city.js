/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict'
const sg_constant = require("../services/sg_constant")

class SG_City extends require('./sg_stage') {
    constructor(_stageNumber, _stageType, _cityName, _des, _occupyPrice, _buildPrice,
                _colorFollow, _cityType = 1, sameColorCityCount) {
        super(_stageNumber, _stageType, _cityName, _des)
        this.occupyPrice = _occupyPrice//占领地价格
        this.buildPrice = _buildPrice//建城费
        this.colorFollow = _colorFollow//相同颜色区分(1~5,6是古战场)
        this.tax1 = this.occupyPrice / 2//基数为领地价格的一半,普通为基数,小城为基数2倍,大城为基数4倍
        this.tax2 = this.occupyPrice
        this.tax3 = this.occupyPrice * 2
        this.cityType = _cityType
    }
}
module.exports = SG_City