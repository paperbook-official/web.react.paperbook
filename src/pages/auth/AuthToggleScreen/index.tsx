import React from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from 'styled-components';

import { Container, ClickableText } from './styles';

interface AuthToggleScreenProps {
    text: string;
    clickableText: string;
    path: string;
    style?: React.CSSProperties;
}

const AuthToggleScreen: React.FC<AuthToggleScreenProps> = ({
    text,
    clickableText,
    path,
    style
}: AuthToggleScreenProps): JSX.Element => {
    const theme = useTheme();

    return (
        <Container style={style}>
            <span
                style={{
                    marginRight: 7,
                    color: theme.colors.defaultDarkGrey
                }}
            >
                {text}
            </span>
            <Link to={path} style={{ textDecoration: 'none' }}>
                <ClickableText>{clickableText}</ClickableText>
            </Link>
        </Container>
    );
};

export default AuthToggleScreen;
