import React from 'react';

import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './styles/globalStyles';
import { light } from './styles/themes/light';

const App: React.FC = (): JSX.Element => {
    return (
        <ThemeProvider theme={light}>
            <GlobalStyle />
            <div className="App"></div>
        </ThemeProvider>
    );
};

App.displayName = 'App';

export default App;
