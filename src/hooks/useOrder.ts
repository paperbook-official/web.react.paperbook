import { useContext } from 'react';

import { OrderContext, OrderContextData } from '../contexts/orderContext';

export const useOrder = (): OrderContextData => {
    return useContext(OrderContext);
};
