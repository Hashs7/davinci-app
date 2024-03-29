import axios from 'axios';

export const api = axios.create({ baseURL: process.env.VUE_APP_API_URL });

/**
 *
 * @returns {Promise<AxiosPromise>}
 */
export const createMatrix = async (row,column) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        url: '/newMatrix',
        data: {
            row,
            column
        }
    };
    return api(options)
};

/**
 *
 * @returns {Promise<AxiosPromise>}
 */
export const setItem = async (type, position) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        url: '/setItem',
        data: {
            type,
            position
        }
    };
    return api(options)
};

/**
 *
 * @returns {Promise<AxiosPromise>}
 */
export const getPath = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        url: '/findPath'
    };
    return api(options)
};

/**
 *
 * @returns {Promise<AxiosPromise>}
 */
export const getMatrix = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        url: '/matrix'
    };
    return api(options)
};
