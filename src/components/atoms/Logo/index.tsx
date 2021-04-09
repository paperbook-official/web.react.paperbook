import React from 'react';

import { useTheme } from 'styled-components';

import { ReactComponent as LogoIcon } from '../../../assets/icons/book-reader.svg';

import { Container, Title } from './styles';

interface LogoProps {
    showTitle?: boolean;
}

const Logo: React.FC<LogoProps> = ({
    showTitle = true
}: LogoProps): JSX.Element => {
    const theme = useTheme();
    const iconSize = 40;

    return (
        <Container theme={theme}>
            <LogoIcon width={`${iconSize}px`} height={`${iconSize}px`} />
            {showTitle && <Title>PaperBook</Title>}
        </Container>
    );
};

export default Logo;
