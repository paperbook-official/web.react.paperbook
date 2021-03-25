import React, { createContext, useState } from 'react';

import LoadingTopBar from '../components/atoms/LoadingTopBar';

export interface LoadingContextData {
    isLoadingContent: boolean;
    setLoadingContent: (value: boolean) => void;
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
    const [isLoadingContent, setLoadingContent] = useState(false);

    return (
        //#region JSX

        <LoadingContext.Provider
            value={{
                isLoadingContent,
                setLoadingContent
            }}
        >
            {children}
            {isLoadingContent && <LoadingTopBar />}
        </LoadingContext.Provider>

        //#endregion
    );
};

export default LoadingProvider;
