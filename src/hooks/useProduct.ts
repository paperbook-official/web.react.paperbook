import { useContext } from 'react';

import { ProductContext, ProductContextData } from '../contexts/productContext';

export const useProduct = (): ProductContextData => {
    return useContext(ProductContext);
};
