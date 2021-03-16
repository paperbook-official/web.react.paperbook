import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getCookie } from '../../../services/cookies';

import { useTheme } from 'styled-components';

import Cart from '../../atoms/Cart';
import Logo from '../../atoms/Logo';
import SearchBar from '../../molecules/SearchBar';
import { Container, AuthOptionsContainer, AuthOption } from './styles';

const Header: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const [cartAmount, setCartAmount] = useState(0);

    useEffect(() => {
        setCartAmount(parseInt(getCookie('paperbook-cartamount')) || 0);
    }, []);

    return (
        <Container theme={theme}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Logo />
            </Link>
            <SearchBar />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <AuthOptionsContainer>
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                        <AuthOption>Crie sua conta</AuthOption>
                    </Link>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <AuthOption>Entrar</AuthOption>
                    </Link>
                </AuthOptionsContainer>
                <Link to="/cart" style={{ textDecoration: 'none' }}>
                    <Cart cartAmount={cartAmount} />
                </Link>
            </div>
        </Container>
    );
};

export default Header;
