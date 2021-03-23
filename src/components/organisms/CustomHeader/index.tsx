import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CookiesEnum } from '../../../models/enums/cookies';

import { getCookie } from '../../../services/cookies';

import { useAuth } from '../../../hooks/useAuth';
import { useCookies } from '../../../hooks/useCookies';

import { useTheme } from 'styled-components';

import Cart from '../../atoms/Cart';
import Logo from '../../atoms/Logo';
import TextField from '../../molecules/TextField';
import { Container, AuthOptionsContainer, AuthOption } from './styles';

const CustomHeader: React.FC = () => {
    const theme = useTheme();
    const { isCookiesAccepted } = useCookies();
    const { isAuthenticated, getTokenCookie, logout } = useAuth();

    const [cartAmount, setCartAmount] = useState(0);
    const [searchText, setSearchText] = useState('');

    const [isLogged] = useState(isAuthenticated() || !!getTokenCookie());

    useEffect(() => {
        if (isCookiesAccepted) {
            setCartAmount(
                parseInt(getCookie(CookiesEnum.CART_AMOUNT_KEY)) || 0
            );
        }
    }, []);

    const checkKeyboardKey = (
        event: React.KeyboardEvent<HTMLInputElement>,
        elementName: string
    ): void => {
        if (event.key === 'Enter') {
            document.getElementsByName(elementName)[0].blur();
        }
    };

    return (
        <Container theme={theme}>
            <Logo />
            <TextField
                label="Pesquisar"
                name="searchInput"
                onTextChange={setSearchText}
                type="text"
                onKeyDown={(event) => checkKeyboardKey(event, 'searchInput')}
                inputStyle={{ color: 'white' }}
            />
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

export default CustomHeader;
