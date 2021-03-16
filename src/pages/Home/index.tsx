import React from 'react';

import Header from '../../components/organisms/Header';
import { useTheme } from 'styled-components';

import { Container } from './styles';

const Home: React.FC = (): JSX.Element => {
    const theme = useTheme();

    return (
        <Container theme={theme}>
            <Header />
        </Container>
    );
};

export default Home;
