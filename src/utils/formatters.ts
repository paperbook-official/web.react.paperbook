export const formatPrice = (price: number): string => {
    return price.toFixed(2).replace(/\./, ',');
};

export const formatQueryParam = (param: string): string => {
    return param
        .toLowerCase()
        .replace(/\s/g, '-')
        .replace(/-+/g, '-')
        .replace(/(^-+|-+$)/g, '')
        .replace(/\./g, '')
        .trim();
};

export const formatQueryToCommon = (query: string): string => {
    const capitalized = query.charAt(0).toUpperCase() + query.slice(1);
    return capitalized.replace(/-/g, ' ').replace(/\./g, '').trim();
};

export const insertParamInQuery = (
    url: string,
    param: string,
    value: string | number
): string => {
    let newQuery = url;
    if ((value && value !== '') || value === 0) {
        if (url.includes('?')) {
            if (url.includes(param)) {
                const queryParts = newQuery.split(`${param}=`);
                const otherParams = queryParts[1].replace(
                    queryParts[1].split('&')[0] +
                        (queryParts[1].split('&')[1] ? '&' : ''),
                    ''
                );

                if (otherParams) {
                    newQuery = `${queryParts[0]}${param}=${value}&${otherParams}`;
                } else {
                    newQuery = `${queryParts[0]}${param}=${value}`;
                }
            } else {
                newQuery += `${
                    newQuery[newQuery.length - 1] === '&' ? '' : '&'
                }${param}=${value}`;
            }
        } else {
            newQuery += `?${param}=${value}`;
        }
    }
    return newQuery;
};

export const removeQueryParam = (url: string, param: string): string => {
    let newQuery = url;
    if (param && param !== '') {
        const index = url.indexOf(param);
        if (index !== -1) {
            const subUrl = url.substr(index);
            const parts = subUrl.split('&');
            if (parts[1]) {
                const toReplace = url.substr(0, index).includes('&')
                    ? `&${parts[0]}`
                    : parts[0];
                newQuery = url.replace(toReplace, '');
            } else {
                newQuery = url.includes('&')
                    ? url.substr(0, index - 1)
                    : url.substr(0, index);
            }
        }
    }
    return newQuery;
};
