import React from 'react';

import { Container, Subtitle, Title } from './styles';

interface ContentProps {
    style?: React.CSSProperties;
    title: string;
    subtitle: string;
}

const Content: React.FC<ContentProps> = ({
    style,
    title,
    subtitle
}: ContentProps): JSX.Element => {
    return (
        <Container style={style}>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
        </Container>
    );
};

export default Content;
