import React, { useEffect, useState } from 'react';

import { useTheme } from 'styled-components';

import { ReactComponent as StarIcon } from '../../../assets/icons/star.svg';

import { Container } from './styles';

interface RatingProps {
    rating?: number;
    size?: number;
    style?: React.CSSProperties;
    select?: boolean;
    onSelect?(ratingAmount: number): void;
}

const Rating: React.FC<RatingProps> = ({
    rating = 0,
    size = 24,
    style,
    select,
    onSelect
}: RatingProps) => {
    const theme = useTheme();

    const [starColors, setStarColors] = useState([
        false,
        false,
        false,
        false,
        false
    ]);
    const [selected, setSelected] = useState(0);

    const stars = [1, 2, 3, 4, 5];

    useEffect(() => {
        const colors = [...starColors];
        for (let i = 0; i < rating; i++) {
            colors[i] = true;
        }
        setStarColors(colors);
        setSelected(rating);
    }, []);

    const getColor = (starNumber: number): string => {
        return starColors[starNumber - 1]
            ? theme.colors.defaultHighlightGreyBlue
            : theme.colors.defaultGrey;
    };

    const onStarHover = (starNumber: number): void => {
        const colors = [...starColors];

        for (let i = 0; i < starNumber; i++) {
            colors[i] = true;
        }

        for (let i = starNumber; i < colors.length; i++) {
            colors[i] = false;
        }

        setStarColors(colors);
    };

    const onClick = (starNumber: number): void => {
        if (select && onSelect) {
            setSelected(starNumber);
            onSelect(starNumber);
        }
    };

    return (
        <Container style={style}>
            {stars.map((index) => (
                <StarIcon
                    key={index}
                    color={getColor(index)}
                    onMouseEnter={() => select && onStarHover(index)}
                    onMouseLeave={() => select && onStarHover(selected)}
                    onClick={() => onClick(index)}
                    height={size}
                    width={size}
                    style={{ cursor: select ? 'pointer' : 'default' }}
                />
            ))}
        </Container>
    );
};

export default Rating;
