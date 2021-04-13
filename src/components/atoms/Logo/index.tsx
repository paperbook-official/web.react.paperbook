import React from 'react';

import { useTheme } from 'styled-components';

import { ReactComponent as LogoIcon } from '../../../assets/icons/book-reader.svg';

import { Container, Title } from './styles';

interface LogoProps {
    showTitle?: boolean;
    color?: string;
    size?: number;
}

const Logo: React.FC<LogoProps> = ({
    showTitle = true,
    color = '#f5f5f5',
    size = 40
}: LogoProps): JSX.Element => {
    const theme = useTheme();

    return (
        <Container theme={theme}>
            <LogoIcon width={`${size}px`} height={`${size}px`} color={color} />
            {showTitle && <Title>PaperBook</Title>}
        </Container>
    );
};

export default Logo;
