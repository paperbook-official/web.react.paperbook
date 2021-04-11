import React from 'react';

import { useShipping } from '../../../hooks/useShipping';

import { useTheme } from 'styled-components';

import {
    SelectedContainer,
    ArriveDate,
    Container,
    InfoContainer,
    ServiceName,
    Price
} from './styles';

interface ShippingOptionProps {
    name: string;
    daysToArrive: number;
    price: number;
    isSelected?: boolean;
    onClick(): void;
    style?: React.CSSProperties;
}

const ShippingOption: React.FC<ShippingOptionProps> = ({
    name,
    daysToArrive,
    price,
    isSelected = false,
    onClick,
    style
}: ShippingOptionProps): JSX.Element => {
    const theme = useTheme();
    const { getArriveDate } = useShipping();

    return (
        <Container style={style} onClick={onClick}>
            <SelectedContainer isSelected={isSelected} />
            <InfoContainer>
                <ServiceName>{name}</ServiceName>
                <ArriveDate>
                    Chegará{' '}
                    <span style={{ fontWeight: 500 }}>
                        {getArriveDate(daysToArrive, price)}
                    </span>
                </ArriveDate>
                {price > 0 ? (
                    <Price>
                        R$ <span>{price.toFixed(2).replace(/\./, ',')}</span>
                    </Price>
                ) : (
                    <Price>
                        <span style={{ color: theme.colors.defaultLightGreen }}>
                            Grátis
                        </span>
                    </Price>
                )}
            </InfoContainer>
        </Container>
    );
};

export default ShippingOption;
