import axios from 'axios';
import Cookies from 'js-cookie'
require('dotenv').config({ path: '.env' })
console.log( process.env.REACT_APP_API_URl )
//const token = Buffer.from(`${Cookies.get( 'token' )}`).toString('base64')
const token = Cookies.get( 'token' );

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URl,
    timeout: 30000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${token}`
    },
})

export const apiLogin = axios.create({
    baseURL: process.env.REACT_APP_API_URl,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
})

//export default api;