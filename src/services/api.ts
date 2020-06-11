import axios from 'axios';
import Cookies from 'js-cookie'

const api = axios.create({
    baseURL: 'http://localhost:3333/',
    timeout: 100000,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${Cookies.get( 'token' )}`,
    },
})

export default api;