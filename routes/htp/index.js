'use strict';

const express = require('express');
const router = express.Router();

const base = require('./base');
const login = require('./login');

/**
 * 登入相关
 */
router.use('/login', login);

/**
 * 基本信息相关
 */
router.use('/base', base);

module.exports = router;