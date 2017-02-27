'use strict';

const express = require('express');
const router = express.Router();

const gameController = require('../../api/game_info_contrl');

router.get('/mapInfo', gameController.mapInfo);
router.get('/heroInfo', gameController.heroInfo);

module.exports = router;