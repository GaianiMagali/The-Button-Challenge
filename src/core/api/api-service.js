import axios from 'axios';
import { API_URL_USERS } from '../constants';

export const api = {
    login(username) {
        return dispatch({
            url: `${API_URL_USERS}?username=${username}`
        })
    }
}


export function dispatch(options) {
    let config = {
        method: options.method || 'get',
        url: options.url
    }

    return axios(config)
        .then(res => res.data)
        .catch(error => console.log(error))
}