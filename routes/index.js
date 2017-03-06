'use strict';
// http
const express = require('express');
const router = express.Router();

const base = require('./base');
const user = require('./user');

/**
 * 心跳检测
 */
router.get('/ping', (req, res) => {
    res.send('');
});

/**
 * 一般用户相关
 */
router.use('/user', user);

/**
 * 基本信息相关
 */
router.use('/base', base);

exports.router = router;