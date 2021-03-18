import React, { useEffect, useState } from 'react';

import { ActionResultEnum } from '../../../models/enums/actionResultTypes';

import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';

import {
    CloseButton,
    Container,
    Description,
    TextContainer,
    Title
} from './styles';

interface SnackbarProps {
    title: string;
    description: string;
    type: ActionResultEnum;
    timeout?: number;
    onClose(): void;
}

const Snackbar: React.FC<SnackbarProps> = ({
    title,
    description,
    type,
    timeout = 5000,
    onClose
}: SnackbarProps): JSX.Element => {
    const getColor = (type: number): [string, string] => {
        if (type === 0) return ['#ff0044', '#efefef'];
        else if (type === 1) return ['#ff9900', '#efefef'];
        return ['#009e0d', '#efefef'];
    };

    const getHoverColor = (type: number): string => {
        if (type === 0) return '#ffffff';
        else if (type === 1) return '#ffffff';
        return '#ffffff';
    };

    const handleCloseClick = (): void => {
        const container = document.getElementsByClassName(
            'snackbar-container'
        )[0];
        if (container) {
            container.classList.add('snackbar-move-out-animation');
            setTimeout(() => {
                container.classList.remove('snackbar-move-out-animation');
                onClose();
            }, 400);
        }
    };

    const [iconColor, setIconColor] = useState(getColor(type)[1]);

    const [iconScale, setIconScale] = useState(1);

    useEffect(() => {
        setTimeout(() => {
            handleCloseClick();
        }, timeout);
    }, []);

    const iconSize = 26;

    return (
        <Container
            className="snackbar-container snackbar-move-in-animation"
            style={{ backgroundColor: getColor(type)[0] }}
        >
            <TextContainer>
                <Title style={{ color: getColor(type)[1] }}>{title}</Title>
                <Description style={{ color: getColor(type)[1] }}>
                    {description}
                </Description>
            </TextContainer>
            <CloseButton onClick={handleCloseClick}>
                <CloseIcon
                    onMouseEnter={() => {
                        setIconColor(getHoverColor(type));
                        setIconScale(1.2);
                    }}
                    onMouseLeave={() => {
                        setIconColor(getColor(type)[1]);
                        setIconScale(1);
                    }}
                    color={iconColor}
                    style={{
                        transition: 'all 0.3s',
                        transform: `scale(${iconScale})`
                    }}
                    height={iconSize}
                    width={iconSize}
                />
            </CloseButton>
        </Container>
    );
};

export default Snackbar;
