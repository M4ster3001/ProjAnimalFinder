import axios from 'axios';
import Cookies from 'js-cookie'

export const api = axios.create({
    baseURL: 'http://localhost:3333/',
    timeout: 30000,
    withCredentials: true,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${Cookies.get( 'token' )}`,
    },
})

export const apiLogin = axios.create({
    baseURL: 'http://localhost:3333/',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
})

//export default api;