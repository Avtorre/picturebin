import {$authHost, $host } from "./http"
import {jwtDecode} from 'jwt-decode';

export const registration = async (userName, email, password) => {
    const {data} = await $host.post('api/user/registration', {userName, email, password, roleRoleID: 3})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.tokenj)
    return jwtDecode(data.tokenj)
}

export const check = async () => {
    const {data} = await $host.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}