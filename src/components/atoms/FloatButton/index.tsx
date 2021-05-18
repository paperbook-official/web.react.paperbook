// Recebe um icone ReactComponent
// Texto da tool tip
// 320

// document.body.scrollHeight - 320 === window.pageYOffset + window.innerHeight
// if()

import React, { useEffect, useState } from 'react';

import { Button } from './styles';

interface FloatButtonProps {
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    text: string;
}

const FloatButton: React.FC<FloatButtonProps> = ({
    Icon,
    text
}: FloatButtonProps): JSX.Element => {
    const [isButtonVisible, setButtonVisible] = useState(true);

    window.onscroll = (): void => {
        if (
            document.body.scrollHeight - 280 <=
                window.pageYOffset + window.innerHeight &&
            isButtonVisible
        ) {
            const elm = document.getElementById('float-button');
            elm?.classList.add('animate-out');
            setButtonVisible(false);
            setTimeout(() => {
                elm?.classList.add('active');
                elm?.classList.remove('animate-out');
            }, 100);
        } else if (
            document.body.scrollHeight - 280 >
                window.pageYOffset + window.innerHeight &&
            !isButtonVisible
        ) {
            const elm = document.getElementById('float-button');

            elm?.classList.add('animate-in');
            elm?.classList.remove('active');
            setTimeout(() => {
                elm?.classList.remove('animate-in');
            }, 500);
            setButtonVisible(true);
        }
    };

    useEffect(() => {
        if (
            document.body.scrollHeight - 280 <=
                window.pageYOffset + window.innerHeight &&
            isButtonVisible
        ) {
            const elm = document.getElementById('float-button');
            elm?.classList.add('animate-out');
            setButtonVisible(false);
            setTimeout(() => {
                elm?.classList.add('active');
                elm?.classList.remove('animate-out');
            }, 100);
        } else if (
            document.body.scrollHeight - 280 >
                window.pageYOffset + window.innerHeight &&
            !isButtonVisible
        ) {
            const elm = document.getElementById('float-button');

            elm?.classList.add('animate-in');
            elm?.classList.remove('active');
            setTimeout(() => {
                elm?.classList.remove('animate-in');
            }, 500);
            setButtonVisible(true);
        }
    }, []);

    return (
        <Button id="float-button">
            <Icon />
        </Button>
    );
};

export default FloatButton;
