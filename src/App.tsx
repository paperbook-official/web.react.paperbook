import React from 'react';

import CookiesProvider from './contexts/cookiesContext';

import { ThemeProvider } from 'styled-components';

import Routes from './router';
import { GlobalStyle } from './styles/globalStyles';
import { light } from './styles/themes/light';

const App: React.FC = (): JSX.Element => {
    return (
        <ThemeProvider theme={light}>
            <GlobalStyle />
            <CookiesProvider>
                <Routes />
            </CookiesProvider>
        </ThemeProvider>
    );
};

App.displayName = 'App';

export default App;
