import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string;
        colors: {
            defaultGrey: string;
            defaultGreyBlue: string;
            defaultBlue: string;
            defaultHighlightGreyBlue: string;
        };
    }
}
