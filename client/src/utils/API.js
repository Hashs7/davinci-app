import axios from 'axios';

const baseURL = 'http://localhost:3000';
export const api = axios.create({ baseURL });

/**
 *
 * @returns {Promise<AxiosPromise>}
 */
export const createMatrix = async (size) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        url: '/newMatrix',
        data: {
            size
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
