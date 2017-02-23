'use strict';

const express = require('express');
const router = express.Router();

const gameController = require('../../controller/game_info_contrl');

/* GET home page. */
router.get('/gameMap', gameController.gameMapInfo);

module.exports = router;