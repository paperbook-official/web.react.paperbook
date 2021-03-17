import React, { useState } from 'react';

import { useTheme } from 'styled-components';

import { ReactComponent as BackIcon } from '../../../assets/icons/chevron-left.svg';

import { Container } from './styles';

interface BackButtonProps {
    style?: React.CSSProperties;
    onClick?(): void;
}

const BackButton: React.FC<BackButtonProps> = ({
    style,
    onClick
}: BackButtonProps): JSX.Element => {
    const theme = useTheme();

    const iconSize = 30;
    const [iconColor, setIconColor] = useState(theme.colors.defaultLightGrey);

    return (
        <Container
            style={style}
            onClick={onClick}
            onMouseEnter={() => setIconColor(theme.colors.defaultGrey)}
            onMouseLeave={() => setIconColor(theme.colors.defaultLightGrey)}
            theme={theme}
        >
            <BackIcon
                style={{ transition: 'all 0.2s' }}
                color={iconColor}
                width={`${iconSize}px`}
                height={`${iconSize}px`}
            />
        </Container>
    );
};

export default BackButton;
