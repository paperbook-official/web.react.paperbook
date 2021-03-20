import { useContext } from 'react';

import {
    ShippingContext,
    ShippingContextData
} from '../contexts/shippingContext';

export const useShipping = (): ShippingContextData => {
    return useContext(ShippingContext);
};
