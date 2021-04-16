import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../../hooks/useAuth';
import { useCart } from '../../../hooks/useCart';

import { useTheme } from 'styled-components';

import { formatQueryParam } from '../../../utils/formatters';

import Cart from '../../atoms/Cart';
import Logo from '../../atoms/Logo';
import TextField from '../../molecules/TextField';
import { Container, AuthOptionsContainer, AuthOption } from './styles';

const CustomHeader: React.FC = () => {
    const theme = useTheme();
    const { localCart } = useCart();
    const { isAuthenticated, getTokenCookie, logout } = useAuth();
    const history = useHistory();

    const [cartAmount, setCartAmount] = useState(0);
    const [searchText, setSearchText] = useState('');

    const [isLogged] = useState(isAuthenticated() || !!getTokenCookie());

    useEffect(() => {
        if (localCart) {
            setCartAmount(localCart.length);
        }
    }, [localCart]);

    const checkKeyboardKey = (
        event: React.KeyboardEvent<HTMLInputElement>,
        elementName: string
    ): void => {
        if (
            event.key === 'Enter' &&
            searchText.replace(/-/g, '').trim().length > 0
        ) {
            document.getElementsByName(elementName)[0].blur();
            history.push('/products?search=' + formatQueryParam(searchText));
        }
    };

    return (
        <Container theme={theme}>
            <Logo showTitle={window.innerWidth > 1000} />
            <TextField
                label="Pesquisar"
                name="searchInput"
                onTextChange={setSearchText}
                type="text"
                onKeyDown={(event) => checkKeyboardKey(event, 'searchInput')}
                inputStyle={{ color: 'white' }}
                style={{ flexGrow: 1, marginLeft: 60, marginRight: 60 }}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {!isLogged ? (
                    <AuthOptionsContainer>
                        <Link
                            to="/signup"
                            style={{ textDecoration: 'none', marginRight: 30 }}
                        >
                            <AuthOption>Crie sua conta</AuthOption>
                        </Link>
                        <Link
                            to="/login"
                            style={{ textDecoration: 'none', marginRight: 30 }}
                        >
                            <AuthOption>Entrar</AuthOption>
                        </Link>
                    </AuthOptionsContainer>
                ) : (
                    <AuthOptionsContainer>
                        <Link
                            to="/orders"
                            style={{ textDecoration: 'none', marginRight: 30 }}
                        >
                            <AuthOption>Meus pedidos</AuthOption>
                        </Link>
                        <AuthOption
                            style={{ marginRight: 30 }}
                            onClick={logout}
                        >
                            Sair
                        </AuthOption>
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
