import React from 'react';

import { useTheme } from 'styled-components';

import { ActionButton, ActionButtonsContainer, Container } from './styles';

interface ActionsSnackbar {
    text: string;
    firstButtonText: string;
    secondButtonText: string;
    firstButtonColor?: string;
    secondButtonColor?: string;
    color?: string;
    textColor?: string;
    onFirstButtonClick(): void;
    onSecondButtonClick(): void;
}

const ActionSnackbar: React.FC<ActionsSnackbar> = ({
    text,
    firstButtonText,
    secondButtonText,
    firstButtonColor,
    secondButtonColor,
    color,
    textColor,
    onFirstButtonClick,
    onSecondButtonClick
}: ActionsSnackbar): JSX.Element => {
    const theme = useTheme();

    const onButtonClick = (which: number): void => {
        const container = document.getElementsByClassName(
            'action-snackbar-container'
        )[0];

        container.classList.add('action-snackbar-move-out-animation');

        setTimeout(() => {
            if (which === 1) onFirstButtonClick();
            else onSecondButtonClick();
        }, 400);
    };

    return (
        <Container
            className="action-snackbar-container action-snackbar-move-in-animation"
            style={{ backgroundColor: color || theme.colors.defaultDarkBlue }}
        >
            <div
                className="text"
                style={{
                    color: textColor || theme.colors.white,
                    whiteSpace: 'pre-wrap'
                }}
            >
                {text.replace(/\\n/g, '\n')}
            </div>
            <ActionButtonsContainer>
                <ActionButton
                    onClick={() => onButtonClick(1)}
                    style={{ color: firstButtonColor || theme.colors.white }}
                >
                    {firstButtonText}
                </ActionButton>
                <ActionButton
                    onClick={() => onButtonClick(2)}
                    style={{
                        color:
                            secondButtonColor ||
                            theme.colors.defaultLightGrey + 'dd'
                    }}
                >
                    {secondButtonText}
                </ActionButton>
            </ActionButtonsContainer>
        </Container>
    );
};

export default ActionSnackbar;
