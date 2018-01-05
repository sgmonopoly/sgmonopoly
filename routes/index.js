'use strict'
// http
const express = require('express')
const router = express.Router()

const base = require('./base')
const user = require('./user')
const room = require('./room')

/**
 * 首页
 */
router.get('/', (req, res) => {
    res.redirect("/pages/login/login.html")
})

/**
 * 心跳检测
 */
router.get('/ping', (req, res) => {
    res.send('')
})

/**
 * 一般用户相关
 */
router.use('/user', user)

/**
 * 基本信息相关
 */
router.use('/base', base)

/**
 * 房间信息相关
 */
router.use('/room', room)

exports.router = router