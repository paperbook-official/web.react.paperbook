import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string;
        colors: {
            background: string;
            white: string;
            defaultDarkerGrey: string;
            defaultDarkGrey: string;
            defaultMidGrey: string;
            defaultGrey: string;
            defaultLightGrey: string;
            defaultDarkBlue: string;
            defaultBlue: string;
            defaultHighlightGreyBlue: string;
            defaultYellow: string;
            defaultRed: string;
            defaultLightGreen: string;
        };
    }
}
