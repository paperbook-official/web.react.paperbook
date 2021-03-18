import { useContext } from 'react';

import { LoadingContext, LoadingContextData } from '../contexts/loadingContext';

export const useLoading = (): LoadingContextData => {
    return useContext(LoadingContext);
};
