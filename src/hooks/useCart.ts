import { useContext } from 'react';

import { CartContext, CartContextData } from '../contexts/cartContext';

export const useCart = (): CartContextData => {
    return useContext(CartContext);
};
