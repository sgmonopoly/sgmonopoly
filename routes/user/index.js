'use strict';

const express = require('express');
const router = express.Router();

const user_contrl = require('../../api/user_contrl');

/**
 * 注册
 */
router.post('/register', user_contrl.register);
/**
 * 根据nickname登入
 */
router.post('/login', user_contrl.loginByNickname);
/**
 * 修改昵称
 */
router.post('/changeUserInfo', user_contrl.changeUserInfo);
/**
 * 返回所有用户
 */
router.get('/show', user_contrl.showAllUser);

/**
 * 判断指定用户是否已掉线
 */
router.get('/checkDisconnected/:userId', user_contrl.checkIndicatedUserIsDisconnected);

module.exports = router;