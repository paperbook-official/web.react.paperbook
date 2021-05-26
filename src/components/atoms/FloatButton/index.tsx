import React, { useEffect } from 'react';

import { useActionResult } from '../../../hooks/useActionResult';

import { Button } from './styles';

interface FloatButtonProps {
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    text: string;
    onClick(): void;
    iconSize?: number;
    style?: React.CSSProperties;
}

const FloatButton: React.FC<FloatButtonProps> = ({
    Icon,
    text,
    onClick,
    iconSize = 24,
    style
}: FloatButtonProps): JSX.Element => {
    const { setTooltipVisible, setTooltipText } = useActionResult();

    useEffect(() => {
        return () => setTooltipVisible(false);
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
            style={style}
        >
            <Icon height={iconSize} width={iconSize} />
        </Button>
    );
};

export default FloatButton;
