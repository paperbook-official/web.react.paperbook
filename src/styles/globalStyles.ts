import { createGlobalStyle } from 'styled-components';

/**
 * The app's main global styles.
 */
export const GlobalStyle = createGlobalStyle`
    :root {}

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        font-size: 16px;
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;
