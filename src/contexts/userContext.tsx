import React, { createContext, useState } from 'react';

import { UserProxy } from '../models/proxies/user/user';

export interface UserContextData {
    me: UserProxy | undefined;
    setMe(user: UserProxy): void;
}

interface UserProviderProps {
    children: JSX.Element;
}

export const UserContext = createContext<UserContextData>(
    {} as UserContextData
);

export const UserProvider: React.FC<UserProviderProps> = ({
    children
}: UserProviderProps) => {
    const [me, setMe] = useState<UserProxy | undefined>(undefined);

    return (
        //#region JSX

        <UserContext.Provider
            value={{
                me,
                setMe
            }}
        >
            {children}
        </UserContext.Provider>

        //#endregion
    );
};

export default UserProvider;
