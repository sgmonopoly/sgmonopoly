/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict';
const mapInfo = require("../models/map_info");
const heroInfo = require("../models/card_info");
/**
 * 基本的地图信息
 * @param req
 * @param res
 */
exports.mapInfo = (req, res) => {
    res.send(mapInfo);
};
/**
 * 基本的人物信息
 * @param req
 * @param res
 */
exports.heroInfo = (req, res) => {
    res.send(heroInfo);
};