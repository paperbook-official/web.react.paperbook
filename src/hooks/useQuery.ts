import { useLocation } from 'react-router';

const useQuery = (): URLSearchParams => {
    return new URLSearchParams(useLocation().search);
};

export default useQuery;
