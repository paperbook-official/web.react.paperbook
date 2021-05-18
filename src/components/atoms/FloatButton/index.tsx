import React, { useEffect, useState } from 'react';

import { useActionResult } from '../../../hooks/useActionResult';

import { Button } from './styles';

interface FloatButtonProps {
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    text: string;
    onClick(): void;
}

const FloatButton: React.FC<FloatButtonProps> = ({
    Icon,
    text,
    onClick
}: FloatButtonProps): JSX.Element => {
    const { setTooltipVisible, setTooltipText } = useActionResult();

    const [isButtonVisible, setButtonVisible] = useState(true);

    window.onscroll = (): void => {
        if (
            document.body.scrollHeight - 300 <=
                window.pageYOffset + window.innerHeight &&
            isButtonVisible
        ) {
            const elm = document.getElementById('float-button');
            elm?.classList.add('animate-out');
            setTimeout(() => {
                elm?.classList.add('active');
                elm?.classList.remove('animate-out');
            }, 100);
            setButtonVisible(false);
        } else if (
            document.body.scrollHeight - 300 >
                window.pageYOffset + window.innerHeight &&
            !isButtonVisible
        ) {
            const elm = document.getElementById('float-button');

            elm?.classList.remove('active');
            elm?.classList.add('animate-in');
            setTimeout(() => {
                elm?.classList.remove('animate-in');
            }, 500);
            setButtonVisible(true);
        }
    };

    useEffect(() => {
        if (
            document.body.scrollHeight - 300 <=
                window.pageYOffset + window.innerHeight &&
            isButtonVisible
        ) {
            const elm = document.getElementById('float-button');
            elm?.classList.add('animate-out');
            setTimeout(() => {
                elm?.classList.add('active');
                elm?.classList.remove('animate-out');
            }, 100);
            setButtonVisible(false);
        } else if (
            document.body.scrollHeight - 300 >
                window.pageYOffset + window.innerHeight &&
            !isButtonVisible
        ) {
            const elm = document.getElementById('float-button');

            elm?.classList.remove('active');
            elm?.classList.add('animate-in');
            setTimeout(() => {
                elm?.classList.remove('animate-in');
            }, 500);
            setButtonVisible(true);
        }
    }, []);

    return (
        <Button
            id="float-button"
            onMouseEnter={() => {
                setTooltipText(text);
                setTooltipVisible(true);
            }}
            onMouseLeave={() => setTooltipVisible(false)}
            onClick={onClick}
        >
            <Icon />
        </Button>
    );
};

export default FloatButton;
