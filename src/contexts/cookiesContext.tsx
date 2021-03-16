import React, { createContext, useState } from 'react';

import { getCookie } from '../services/cookies';

export interface CookiesContextData {
    isCookiesAccepted: boolean;
    setCookiesAccepted: (value: boolean) => void;
    isCookiesBarConfirmed: boolean;
    setCookiesBarConfirmed: (value: boolean) => void;
}

interface CookiesProviderProps {
    children: JSX.Element;
}

export const CookiesContext = createContext<CookiesContextData>(
    {} as CookiesContextData
);

export const CookiesProvider: React.FC<CookiesProviderProps> = ({
    children
}: CookiesProviderProps) => {
    const [isCookiesAccepted, setCookiesAccepted] = useState(
        getCookie('paperbook-access') === 'true'
    );

    const [isCookiesBarConfirmed, setCookiesBarConfirmed] = useState(false);

    return (
        //#region JSX

        <CookiesContext.Provider
            value={{
                isCookiesAccepted,
                setCookiesAccepted,
                isCookiesBarConfirmed,
                setCookiesBarConfirmed
            }}
        >
            {children}
        </CookiesContext.Provider>

        //#endregion
    );
};

export default CookiesProvider;
