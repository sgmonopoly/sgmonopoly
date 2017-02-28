'use strict';

const express = require('express');
const router = express.Router();

const base = require('./base');
const user = require('./user');

/**
 * 一般用户相关
 */
router.use('/user', user);

/**
 * 基本信息相关
 */
router.use('/base', base);

module.exports = router;