import React from 'react';

import { Container } from './styles';

interface TooltipProps {
    text?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
    text = 'Tooltip'
}: TooltipProps): JSX.Element => {
    window.onmousemove = (event: MouseEvent) => {
        const tooltip = document.getElementById('tooltip');

        if (tooltip) {
            if (tooltip.style.opacity !== '1') {
                const top = event.clientY + (event.view?.pageYOffset || 0) - 30;

                tooltip.style.top =
                    (event.clientY - 30 > 0 ? top : top + 50) + 'px';

                tooltip.style.right =
                    window.innerWidth - event.clientX - 10 + 'px';
            }
        }
    };

    return <Container id="tooltip">{text}</Container>;
};

export default Tooltip;
