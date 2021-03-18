import { useContext } from 'react';

import {
    ActionResultContext,
    ActionResultContextData
} from '../contexts/actionResultContext';

export const useActionResult = (): ActionResultContextData => {
    return useContext(ActionResultContext);
};
