import React from 'react';

import { useCookies } from '../../hooks/useCookies';

import CookieBar from '../../components/organisms/CookieBar';
import Header from '../../components/organisms/Header';
import { useTheme } from 'styled-components';

import { Container } from './styles';

const Home: React.FC = (): JSX.Element => {
    const theme = useTheme();

    const { isCookiesAccepted, isCookiesBarConfirmed } = useCookies();

    return (
        <Container theme={theme}>
            <Header />
            {!isCookiesAccepted && !isCookiesBarConfirmed && <CookieBar />}
        </Container>
    );
};

export default Home;
