import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (
    key: string,
    value: string,
    path: string,
    daysToExpire: number
): void => {
    const expires = new Date();
    expires.setDate(expires.getDate() + daysToExpire);

    cookies.set(key, value, { path, expires });
};

export const getCookie = (key: string): string => {
    return cookies.get(key);
};

export const removeCookie = (key: string): void => {
    cookies.remove(key);
};
