import { useContext } from 'react';

import {
    CategoryContext,
    CategoryContextData
} from '../contexts/categoryContext';

export const useCategory = (): CategoryContextData => {
    return useContext(CategoryContext);
};
