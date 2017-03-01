'use strict';

const express = require('express');
const router = express.Router();

const user_contrl = require('../../../api/user_contrl');

/**
 * 根据nickname登入
 */
router.post('/login', user_contrl.loginByNickname);
/**
 * 修改昵称
 */
router.post('/changeUserInfo', user_contrl.changeUserInfo);

/**
 * 获取在线人数
 */
router.get('/onlineCount', user_contrl.onlineCount);

module.exports = router;