import React from 'react';

import { useTheme } from 'styled-components';

import { ReactComponent as StarIcon } from '../../../assets/icons/star.svg';

import { Container } from './styles';

interface RatingProps {
    rating?: number;
    size?: number;
}

const Rating: React.FC<RatingProps> = ({
    rating = 0,
    size = 24
}: RatingProps) => {
    const theme = useTheme();

    const getColor = (condition: boolean): string => {
        return condition
            ? theme.colors.defaultHighlightGreyBlue
            : theme.colors.defaultGrey;
    };

    return (
        <Container>
            <StarIcon
                color={getColor(rating >= 1)}
                height={size}
                width={size}
            />
            <StarIcon
                color={getColor(rating >= 2)}
                height={size}
                width={size}
            />
            <StarIcon
                color={getColor(rating >= 3)}
                height={size}
                width={size}
            />
            <StarIcon
                color={getColor(rating >= 4)}
                height={size}
                width={size}
            />
            <StarIcon
                color={getColor(rating === 5)}
                height={size}
                width={size}
            />
        </Container>
    );
};

export default Rating;
