'use strict'

const express = require('express')
const router = express.Router()

const gameController = require('../../api/game_info_contrl')

/**
 * 基本的地图信息
 */
router.get('/mapInfo', gameController.mapInfo)
/**
 * 基本的卡片信息
 */
router.get('/heroInfo', gameController.heroInfo)
/**
 * 基本的紧急军情信息
 */
router.get('/situationInfo', gameController.situationInfo)
/**
 * 基本的锦囊妙计信息
 */
router.get('/suggestionInfo', gameController.suggestionInfo)

module.exports = router