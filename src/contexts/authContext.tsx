import React, { createContext, useState } from 'react';

import { CookiesEnum } from '../models/enums/cookies';
import { AuthPayload, SignUpPayload } from '../models/payloads/user';
import { TokenProxy, UserProxy } from '../models/proxies/user';

import api from '../services/api';
import { getCookie, setCookie, removeCookie } from '../services/cookies';

export interface AuthContextData {
    token: string | undefined;
    setToken(token: string): void;
    getToken(authPayload: AuthPayload): Promise<TokenProxy>;
    signUp(payload: SignUpPayload): Promise<UserProxy>;
    login(token: string): Promise<UserProxy>;
    logout(): void;
    isAuthenticated(): boolean;
    getTokenCookie(): string | null;
    setTokenCookie(token: string, expires: number): void;
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
    const [token, setToken] = useState<string | undefined>(undefined);

    const login = async (token: string): Promise<UserProxy> => {
        const proxy = await api.get<UserProxy>('/users/me', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return proxy.data;
    };

    const getToken = async (authPayload: AuthPayload): Promise<TokenProxy> => {
        const response = await api.post<TokenProxy>('/auth/local', authPayload);
        return response.data;
    };

    const signUp = async (payload: SignUpPayload): Promise<UserProxy> => {
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
        setToken(undefined);
        window.location.reload();
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
                setTokenCookie
            }}
        >
            {children}
        </AuthContext.Provider>

        //#endregion
    );
};

export default AuthProvider;
