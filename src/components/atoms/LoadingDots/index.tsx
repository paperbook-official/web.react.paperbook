import React from 'react';

import { Container } from './styles';

interface LoadingDotsProps {
    color?: string;
    style?: React.CSSProperties;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({
    color,
    style
}: LoadingDotsProps) => {
    return (
        <Container style={style} color={color}>
            <div className="dot1"></div>
            <div className="dot2"></div>
            <div className="dot3"></div>
            <div className="dot4"></div>
        </Container>
    );
};

export default LoadingDots;
