import axios from 'axios';

export function userLogin(nickname = '', avatar = '') {
    return axios.post('/user/login', {
        nickname: nickname,
        avatar: avatar
    })
}