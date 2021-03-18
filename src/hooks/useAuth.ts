import { useContext } from 'react';

import { AuthContext, AuthContextData } from '../contexts/authContext';

export const useAuth = (): AuthContextData => {
    return useContext(AuthContext);
};
