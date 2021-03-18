import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CookiesEnum } from '../../../models/enums/cookies';

import { getCookie } from '../../../services/cookies';

import { useAuth } from '../../../hooks/useAuth';
import { useCookies } from '../../../hooks/useCookies';

import { useTheme } from 'styled-components';

import Cart from '../../atoms/Cart';
import Logo from '../../atoms/Logo';
import SearchBar from '../../molecules/SearchBar';
import { Container, AuthOptionsContainer, AuthOption } from './styles';

const Header: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const { isCookiesAccepted } = useCookies();
    const { isAuthenticated, getTokenCookie, logout } = useAuth();

    const [cartAmount, setCartAmount] = useState(0);

    const [isLogged] = useState(isAuthenticated() || !!getTokenCookie());

    useEffect(() => {
        if (isCookiesAccepted) {
            setCartAmount(
                parseInt(getCookie(CookiesEnum.CART_AMOUNT_KEY)) || 0
            );
        }
    }, []);

    return (
        <Container theme={theme}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Logo />
            </Link>
            <SearchBar />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {!isLogged ? (
                    <AuthOptionsContainer>
                        <Link to="/signup" style={{ textDecoration: 'none' }}>
                            <AuthOption>Crie sua conta</AuthOption>
                        </Link>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <AuthOption>Entrar</AuthOption>
                        </Link>
                    </AuthOptionsContainer>
                ) : (
                    <AuthOptionsContainer>
                        <Link to="/orders" style={{ textDecoration: 'none' }}>
                            <AuthOption>Meus pedidos</AuthOption>
                        </Link>
                        <AuthOption onClick={logout}>Sair</AuthOption>
                    </AuthOptionsContainer>
                )}
                <Link to="/cart" style={{ textDecoration: 'none' }}>
                    <Cart cartAmount={cartAmount} />
                </Link>
            </div>
        </Container>
    );
};

export default Header;
