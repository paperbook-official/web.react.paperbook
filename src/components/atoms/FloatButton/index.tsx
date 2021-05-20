import React from 'react';

import { useActionResult } from '../../../hooks/useActionResult';

import { Button } from './styles';

interface FloatButtonProps {
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    text: string;
    onClick(): void;
    style?: React.CSSProperties;
}

const FloatButton: React.FC<FloatButtonProps> = ({
    Icon,
    text,
    onClick,
    style
}: FloatButtonProps): JSX.Element => {
    const { setTooltipVisible, setTooltipText } = useActionResult();

    return (
        <Button
            id="float-button"
            onMouseEnter={() => {
                setTooltipText(text);
                setTooltipVisible(true);
            }}
            onMouseLeave={() => setTooltipVisible(false)}
            onClick={onClick}
            style={style}
        >
            <Icon />
        </Button>
    );
};

export default FloatButton;
