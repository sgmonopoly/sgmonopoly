'use strict';

const express = require('express');
const router = express.Router();

const gameController = require('../../api/game_info_contrl');

/**
 * 基本的地图信息
 */
router.get('/mapInfo', gameController.mapInfo);
/**
 * 基本的人物信息
 */
router.get('/heroInfo', gameController.heroInfo);

module.exports = router;