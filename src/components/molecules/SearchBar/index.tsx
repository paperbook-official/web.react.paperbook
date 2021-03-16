import React, { useState } from 'react';

import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';

import { Container, SearchInput, SearchLabel } from './styles';

const SearchBar: React.FC = (): JSX.Element => {
    const iconSize = 24;
    const [searchText, setSearchText] = useState('');

    const searchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log(searchText);
            document.getElementsByName('searchInput')[0].blur();
        }
    };

    return (
        <Container>
            <SearchInput
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
                style={{ position: 'absolute', top: '3px' }}
            />
        </Container>
    );
};

export default SearchBar;
