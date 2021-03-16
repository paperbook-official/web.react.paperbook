import React from 'react';

import { setCookie } from '../../../services/cookies';

import { useCookies } from '../../../hooks/useCookies';

import { useTheme } from 'styled-components';

import { ActionContainer, Container, CookieText, TextButton } from './styles';

const CookieBar: React.FC = (): JSX.Element => {
    const theme = useTheme();

    const { setCookiesAccepted, setCookiesBarConfirmed } = useCookies();

    const setCookieState = (condition: boolean): void => {
        setCookiesAccepted(condition);
        setCookiesBarConfirmed(true);
        setCookie('paperbook-access', `${condition}`, '/', 365);
    };

    return (
        <Container theme={theme}>
            <CookieText>
                Aceite nossos cookies para uma melhor experiência!
            </CookieText>
            <ActionContainer>
                <TextButton
                    onClick={() => setCookieState(false)}
                    textColor="grey"
                    backgroundColor="transparent"
                    textColorHover={theme.colors.defaultGrey}
                    backgroundColorHover="transparent"
                    style={{ marginRight: 10 }}
                >
                    Agora não
                </TextButton>
                <TextButton
                    onClick={() => setCookieState(true)}
                    textColor={theme.colors.defaultDarkBlue}
                    backgroundColor={theme.colors.background}
                    textColorHover={theme.colors.defaultLightGrey}
                    backgroundColorHover={theme.colors.defaultBlue}
                >
                    Aceitar
                </TextButton>
            </ActionContainer>
        </Container>
    );
};

export default CookieBar;
