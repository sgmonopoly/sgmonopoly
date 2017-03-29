import axios from 'axios';

export function getRooms() {
    return axios.get('/room/show')
}