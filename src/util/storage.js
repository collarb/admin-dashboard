
import { AUTH_KEY } from './constants';

export const getAuthToken = () => {
    try {
        const value = localStorage.getItem(AUTH_KEY);
        if (value !== null) {
            const data = JSON.parse(value);
            return data.access;
        }
    } catch (e) {
        // error reading value
    }
};

export const getRefreshToken = () => {
    try {
        const value = localStorage.getItem(AUTH_KEY);
        if (value !== null) {
            const data = JSON.parse(value);
            return data.refresh;
        }
    } catch (e) {
        // error reading value
    }
};

export const deleteAuthToken = async () => {
    localStorage.removeItem(AUTH_KEY);
};

export const setAuthToken = data => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(data));
};