import { getCookie, setCookie, removeCookie } from './cookies';

export const TOKEN_KEY = '@pb-access-token';

export const isAuthenticated = (): boolean => getCookie(TOKEN_KEY) != null;

export const getToken = (): string | null => getCookie(TOKEN_KEY);

export const login = (token: string): void => {
    setCookie(TOKEN_KEY, token, '/', 7);
};

export const logout = (): void => {
    removeCookie(TOKEN_KEY);
};
