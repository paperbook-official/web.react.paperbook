import React from 'react';

import ActionResultProvider from './contexts/actionResultContext';
import AuthProvider from './contexts/authContext';
import CartProvider from './contexts/cartContext';
import CategoryProvider from './contexts/categoryContext';
import CookiesProvider from './contexts/cookiesContext';
import LoadingProvider from './contexts/loadingContext';
import ProductProvider from './contexts/productContext';
import ShippingProvider from './contexts/shippingContext';
import UserProvider from './contexts/userContext';

import { ThemeProvider } from 'styled-components';

import Routes from './router';
import { GlobalStyle } from './styles/globalStyles';
import { light } from './styles/themes/light';

const App: React.FC = (): JSX.Element => {
    return (
        <ThemeProvider theme={light}>
            <GlobalStyle />
            <ActionResultProvider>
                <LoadingProvider>
                    <CookiesProvider>
                        <ShippingProvider>
                            <AuthProvider>
                                <UserProvider>
                                    <CartProvider>
                                        <CategoryProvider>
                                            <ProductProvider>
                                                <Routes />
                                            </ProductProvider>
                                        </CategoryProvider>
                                    </CartProvider>
                                </UserProvider>
                            </AuthProvider>
                        </ShippingProvider>
                    </CookiesProvider>
                </LoadingProvider>
            </ActionResultProvider>
        </ThemeProvider>
    );
};

App.displayName = 'App';

export default App;
