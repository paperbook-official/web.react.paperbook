import { useContext } from 'react';

import { CookiesContext, CookiesContextData } from '../contexts/cookiesContext';

export const useCookies = (): CookiesContextData => {
    return useContext(CookiesContext);
};
