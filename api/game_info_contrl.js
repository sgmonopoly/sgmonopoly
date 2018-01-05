/**
 * Created by yuanxiang on 2/21/17.
 */
'use strict'
const mapInfo = require("../models/map_info")
const heroInfo = require("../models/hero_info")
const situationInfo = require("../models/situation_info")
const suggestionInfo = require("../models/suggestion_info")
/**
 * 基本的地图信息
 * @param req
 * @param res
 */
exports.mapInfo = (req, res) => {
    res.send(mapInfo)
}
/**
 * 基本的卡片信息
 * @param req
 * @param res
 */
exports.heroInfo = (req, res) => {
    res.send(heroInfo)
}

/**
 * 基本的紧急军情信息
 * @param req
 * @param res
 */
exports.situationInfo = (req, res) => {
    res.send(situationInfo)
}

/**
 * 基本的锦囊妙计信息
 * @param req
 * @param res
 */
exports.suggestionInfo = (req, res) => {
    res.send(suggestionInfo)
}