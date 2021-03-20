import React from 'react';

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
    const days = [
        'Domingo',
        'Segunda-Feira',
        'Terça-Feira',
        'Quarta-Feira',
        'Quinta-Feira',
        'Sexta-Feira',
        'Sábado'
    ];

    const getArriveDate = (): string => {
        const date = new Date();
        date.setDate(date.getDate() + daysToArrive);

        const localDate = date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        const arriveDay = date.getDay();

        if (daysToArrive === 0) return 'hoje';
        if (daysToArrive === 1) return 'amanhã';
        if (daysToArrive <= 7)
            return `${days[arriveDay]}, ${localDate.split('/')[0]}/${
                localDate.split('/')[1]
            }`;
        return `${localDate.split('/')[0]}/${localDate.split('/')[1]}`;
    };

    return (
        <Container style={style} onClick={onClick}>
            <SelectedContainer isSelected={isSelected} />
            <InfoContainer>
                <ServiceName>{name}</ServiceName>
                <ArriveDate>
                    Chegará{' '}
                    <span style={{ fontWeight: 500 }}>{getArriveDate()}</span>
                </ArriveDate>
                <Price>
                    R$ <span>{price.toFixed(2).replace(/\./, ',')}</span>
                </Price>
            </InfoContainer>
        </Container>
    );
};

export default ShippingOption;
