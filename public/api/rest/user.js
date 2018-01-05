'use strict'
import axios from 'axios'

export function userLogin(nickname) {
    return axios.post('/user/login', {
        nickname: nickname
    })
}

export function register(nickname = '', avatar = '', password = '') {
    return axios.post('/user/register', {
        nickname: nickname,
        avatar: avatar,
        password: password
    })
}