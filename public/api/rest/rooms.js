import axios from 'axios';

export function getRooms() {
    return axios.get('/room/show')
}

export function enterRoom(roomId) {
    return axios.get('/room/enter/'+roomId);
}

export function getRoom(roomId) {
    return axios.get('/room/show/'+roomId);
}