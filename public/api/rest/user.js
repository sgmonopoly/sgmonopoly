import axios from 'axios';

export function userLogin(nickname = '', password = '') {
    return axios.post('/user/login', {
        nickname: nickname,
        password: password
    });
}

export function register(nickname = '', avatar = '', password = '') {
    return axios.post('/user/register', {
        nickname: nickname,
        avatar: avatar,
        password: password
    });
}