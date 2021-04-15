import React from 'react';

import { CEPProxy } from '../../../models/proxies/cep/cep';

import { useShipping } from '../../../hooks/useShipping';

import { ShippingOptionData } from '../../../contexts/shippingContext';

import { useTheme } from 'styled-components';

import { ReactComponent as MapMarkerIcon } from '../../../assets/icons/map-marker.svg';
import { ReactComponent as TruckIcon } from '../../../assets/icons/truck.svg';

import { Container, ShippingArriveDate, ShippingOption } from './styles';

interface ShippingInfoProps {
    onShippingOptionsClick(): void;
    option?: ShippingOptionData;
    cep?: CEPProxy;
}

const ShippingInfo: React.FC<ShippingInfoProps> = ({
    onShippingOptionsClick,
    option,
    cep
}: ShippingInfoProps): JSX.Element => {
    const theme = useTheme();
    const { getArriveDate } = useShipping();

    const isShippingFree = option?.price === 0;

    return (
        <Container>
            {!cep || !option ? (
                <>
                    <MapMarkerIcon
                        height="18"
                        width="18"
                        style={{ transform: 'scaleX(-1)' }}
                        color={theme.colors.defaultHighlightGreyBlue}
                    />
                    <ShippingOption onClick={onShippingOptionsClick}>
                        Calcular prazo de entrega
                    </ShippingOption>
                </>
            ) : (
                <>
                    <TruckIcon
                        height="22"
                        width="22"
                        style={{ transform: 'scaleX(-1)' }}
                        color={
                            isShippingFree
                                ? theme.colors.defaultLightGreen
                                : theme.colors.defaultMidGrey
                        }
                    />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <ShippingArriveDate
                            className={isShippingFree ? 'shipping-free' : ''}
                        >
                            Chegará{' '}
                            {getArriveDate(option.daysToArrive, option.price)}
                        </ShippingArriveDate>
                        <ShippingOption
                            className="more-options"
                            onClick={onShippingOptionsClick}
                        >
                            Ver mais opções de entrega
                        </ShippingOption>
                    </div>
                </>
            )}
        </Container>
    );
};

export default ShippingInfo;
