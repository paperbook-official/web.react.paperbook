import React, { createContext, useState } from 'react';

import { CookiesEnum } from '../models/enums/cookies';
import { LoginPayload } from '../models/payloads/auth/loginPayload';
import { CreateUserPayload } from '../models/payloads/user/createUser';
import { TokenProxy } from '../models/proxies/auth/token';
import { UserProxy } from '../models/proxies/user/user';

import api from '../services/api';
import { getCookie, setCookie, removeCookie } from '../services/cookies';

import { useCookies } from '../hooks/useCookies';

export interface AuthContextData {
    token: string | undefined;
    setToken(token: string): void;
    getToken(authPayload: LoginPayload): Promise<TokenProxy>;
    signUp(payload: CreateUserPayload): Promise<UserProxy>;
    login(token: string): Promise<UserProxy>;
    logout(): void;
    isAuthenticated(): boolean;
    getTokenCookie(): string | null;
    setTokenCookie(token: string, expires: number): void;
    refreshToken(): Promise<void>;
}

interface AuthProviderProps {
    children: JSX.Element;
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

export const AuthProvider: React.FC<AuthProviderProps> = ({
    children
}: AuthProviderProps) => {
    const { isCookiesAccepted } = useCookies();

    const [token, setToken] = useState<string | undefined>(undefined);

    const login = async (token: string): Promise<UserProxy> => {
        const proxy = await api.get<UserProxy>('/users/me', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return proxy.data;
    };

    const getToken = async (
        loginPayload: LoginPayload
    ): Promise<TokenProxy> => {
        const response = await api.post<TokenProxy>(
            '/auth/local',
            loginPayload
        );
        return response.data;
    };

    const signUp = async (payload: CreateUserPayload): Promise<UserProxy> => {
        const response = await api.post<UserProxy>('/users', payload);
        return response.data;
    };

    const isAuthenticated = (): boolean => !!token;

    const getTokenCookie = (): string | null =>
        getCookie(CookiesEnum.TOKEN_KEY);

    const setTokenCookie = (token: string, expires: number): void => {
        setCookie(CookiesEnum.TOKEN_KEY, token, '/', expires);
    };

    const logout = (): void => {
        removeCookie(CookiesEnum.TOKEN_KEY);
        setTokenCookie('', 0);
        setToken(undefined);
        window.location.reload();
    };

    const refreshToken = async (): Promise<void> => {
        const response = await api.post<TokenProxy>(
            '/auth/refresh',
            {},
            {
                headers: { Authorization: 'Bearer ' + token }
            }
        );

        setToken(response.data.token);

        if (isCookiesAccepted) {
            const expLen = response.data.expiresIn.length - 1;
            const expires =
                response.data.expiresIn[expLen] === 'a'
                    ? parseInt(response.data.expiresIn.substr(0, expLen)) * 365
                    : parseInt(response.data.expiresIn[expLen]);
            setTokenCookie(response.data.token, expires);
        }
    };

    return (
        //#region JSX

        <AuthContext.Provider
            value={{
                token,
                setToken,
                getToken,
                signUp,
                login,
                logout,
                isAuthenticated,
                getTokenCookie,
                setTokenCookie,
                refreshToken
            }}
        >
            {children}
        </AuthContext.Provider>

        //#endregion
    );
};

export default AuthProvider;
