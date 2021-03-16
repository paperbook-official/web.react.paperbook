import React, { createContext, useState } from 'react';

export interface CookiesContextData {
    isCookiesAccepted: boolean;
    setCookiesAccepted: (value: boolean) => void;
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
    const [isCookiesAccepted, setCookiesAccepted] = useState(false);

    return (
        //#region JSX

        <CookiesContext.Provider
            value={{ isCookiesAccepted, setCookiesAccepted }}
        >
            {children}
        </CookiesContext.Provider>

        //#endregion
    );
};

export default CookiesProvider;
