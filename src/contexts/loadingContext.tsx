import React, { createContext, useState } from 'react';

export interface LoadingContextData {
    isLoading: boolean;
    setLoading: (value: boolean) => void;
}

interface LoadingProviderProps {
    children: JSX.Element;
}

export const LoadingContext = createContext<LoadingContextData>(
    {} as LoadingContextData
);

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
    children
}: LoadingProviderProps) => {
    const [isLoading, setLoading] = useState(false);

    return (
        //#region JSX

        <LoadingContext.Provider
            value={{
                isLoading,
                setLoading
            }}
        >
            {children}
        </LoadingContext.Provider>

        //#endregion
    );
};

export default LoadingProvider;
