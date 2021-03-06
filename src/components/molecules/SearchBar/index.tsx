import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import useQuery from '../../../hooks/useQuery';

import { formatQueryParam } from '../../../utils/formatters';

import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';

import { Container, SearchInput, SearchLabel } from './styles';

interface SearchBarProps {
    onSearch?(text: string): void | Promise<void>;
}

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch
}: SearchBarProps): JSX.Element => {
    const query = useQuery();
    const history = useHistory();

    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        setSearchText(query.get('search')?.replace(/-/g, ' ') || '');
    }, []);

    const iconSize = 24;

    const searchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            event.key === 'Enter' &&
            searchText.replace(/-/g, '').trim().length > 0
        ) {
            setSearchText(
                searchText
                    .replace(/-/g, ' ')
                    .replace(/\s+/g, ' ')
                    .replace(/\./g, '')
                    .trim()
            );
            document.getElementsByName('searchInput')[0].blur();

            const queryDisplay = query.get('displayType');

            if (queryDisplay)
                history.push(
                    `/products?search=${formatQueryParam(
                        searchText
                    )}&displayType=${queryDisplay}`
                );
            else
                history.push(
                    '/products?search=' + formatQueryParam(searchText)
                );

            if (onSearch) onSearch(searchText);
        }
    };

    return (
        <Container>
            <SearchInput
                value={searchText}
                onKeyDown={searchKeyPress}
                onChange={(element) => setSearchText(element.target.value)}
                name="searchInput"
                type="text"
                required
            />
            <SearchLabel>Pesquisar</SearchLabel>
            <SearchIcon
                width={`${iconSize}px`}
                height={`${iconSize}px`}
                style={{ position: 'absolute', right: 10, top: '3px' }}
            />
        </Container>
    );
};

export default SearchBar;
