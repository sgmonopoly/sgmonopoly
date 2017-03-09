'use strict';

const express = require('express');
const router = express.Router();

const room_contrl = require('../../api/room_contrl');
const user_contrl = require('../../api/user_contrl');
/**
 * 进入房间
 */
router.get('/enter/:roomNumber', user_contrl.checkUserIsLogin, room_contrl.enter);

/**
 * 退出房间
 */
//router.get('/quit/:roomNumber', user_contrl.checkUserIsLogin, room_contrl.quit);

/**
 * 显示1个房间信息
 */
router.get('/show/:roomNumber', room_contrl.show);

/**
 * 显示1个房间信息
 */
router.get('/show', room_contrl.showAll);

module.exports = router;