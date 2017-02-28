'use strict';

const express = require('express');
const router = express.Router();

const login_contrl = require('../../../api/login_contrl');
/**
 * 根据nickname登入
 */
router.post('/login', login_contrl.loginByNickname);
/**
 * 修改昵称
 */
router.post('/changeNickname', login_contrl.changeNickname);

/**
 * 获取在线人数
 */
router.get('/onlineCount', login_contrl.onlineCount);

module.exports = router;