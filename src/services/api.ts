import axios from 'axios';
import Cookies from 'js-cookie'

//const token = Buffer.from(`${Cookies.get( 'token' )}`).toString('base64')
const token = Cookies.get( 'token' );

export const api = axios.create({
    baseURL: 'https://ong-an-finders-backend.herokuapp.com/',
    timeout: 30000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${token}`
    },
})

export const apiLogin = axios.create({
    baseURL: 'https://ong-an-finders-backend.herokuapp.com/',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
})

//export default api;
