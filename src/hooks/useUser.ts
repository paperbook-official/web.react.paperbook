import { useContext } from 'react';

import { UserContext, UserContextData } from '../contexts/userContext';

export const useUser = (): UserContextData => {
    return useContext(UserContext);
};
