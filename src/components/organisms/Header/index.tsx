import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../../hooks/useAuth';
import { useCart } from '../../../hooks/useCart';

import { useTheme } from 'styled-components';

import { ReactComponent as CartIcon } from '../../../assets/icons/shopping-cart.svg';

import Cart from '../../atoms/Cart';
import Logo from '../../atoms/Logo';
import SearchBar from '../../molecules/SearchBar';
import {
    Container,
    AuthOptionsContainer,
    AuthOption,
    ProgressContainer,
    ProgressNameContainer,
    ProgressBar
} from './styles';

interface HeaderOptions {
    isSecondary?: boolean;
}

const Header: React.FC<HeaderOptions> = ({
    isSecondary
}: HeaderOptions): JSX.Element => {
    const theme = useTheme();
    const history = useHistory();
    const { localCart } = useCart();
    const { isAuthenticated, getTokenCookie, logout } = useAuth();

    const [cartAmount, setCartAmount] = useState(0);

    const [isLogged] = useState(isAuthenticated() || !!getTokenCookie());

    useEffect(() => {
        if (localCart) {
            setCartAmount(localCart.length);
        }
    }, [localCart]);

    const getProgressState = (): number => {
        const location = history.location.pathname;

        if (location === '/cart') {
            return 1;
        } else if (location === '/identification') {
            return 2;
        } else if (location === '/payment') {
            return 3;
        } else {
            return 0;
        }
    };

    const getIconColor = (iconNumber: number): string => {
        if (iconNumber === 1) {
            return theme.colors.defaultLightGreen;
        } else if (iconNumber === 2) {
            return getProgressState() >= 2
                ? theme.colors.defaultLightGreen
                : theme.colors.defaultGrey;
        } else {
            return getProgressState() === 3
                ? theme.colors.defaultLightGreen
                : theme.colors.defaultGrey;
        }
    };

    const pushTo = (path: string): void => {
        history.push(path);
    };

    return (
        <Container theme={theme}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Logo />
            </Link>
            {isSecondary ? (
                <ProgressContainer>
                    <ProgressBar
                        className={`first ${
                            getProgressState() >= 2 ? 'active' : ''
                        }`}
                    />
                    <ProgressBar
                        className={`second ${
                            getProgressState() === 3 ? 'active' : ''
                        }`}
                    />

                    <ProgressNameContainer
                        onClick={() =>
                            getProgressState() > 1 && pushTo('/cart')
                        }
                        style={{
                            cursor: getProgressState() > 1 ? 'pointer' : ''
                        }}
                    >
                        <span
                            className={getProgressState() >= 1 ? 'active' : ''}
                        >
                            Carrinho
                        </span>
                        <CartIcon
                            height="26"
                            width="26"
                            color={getIconColor(1)}
                        />
                    </ProgressNameContainer>

                    <ProgressNameContainer
                        onClick={() =>
                            getProgressState() > 2 && pushTo('/identification')
                        }
                        style={{
                            cursor: getProgressState() > 2 ? 'pointer' : ''
                        }}
                    >
                        <span
                            className={getProgressState() >= 2 ? 'active' : ''}
                        >
                            Identificação
                        </span>
                        <CartIcon
                            height="26"
                            width="26"
                            color={getIconColor(2)}
                        />
                    </ProgressNameContainer>

                    <ProgressNameContainer>
                        <span
                            className={getProgressState() === 3 ? 'active' : ''}
                        >
                            Pagamento
                        </span>
                        <CartIcon
                            height="26"
                            width="26"
                            color={getIconColor(3)}
                        />
                    </ProgressNameContainer>
                </ProgressContainer>
            ) : (
                <>
                    <SearchBar />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {!isLogged ? (
                            <AuthOptionsContainer>
                                <Link
                                    to="/signup"
                                    style={{
                                        textDecoration: 'none',
                                        marginRight: 30
                                    }}
                                >
                                    <AuthOption>Crie sua conta</AuthOption>
                                </Link>
                                <Link
                                    to="/login"
                                    style={{
                                        textDecoration: 'none',
                                        marginRight: 30
                                    }}
                                >
                                    <AuthOption>Entrar</AuthOption>
                                </Link>
                            </AuthOptionsContainer>
                        ) : (
                            <AuthOptionsContainer>
                                <Link
                                    to="/orders"
                                    style={{
                                        textDecoration: 'none',
                                        marginRight: 30
                                    }}
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
                </>
            )}
        </Container>
    );
};

export default Header;
