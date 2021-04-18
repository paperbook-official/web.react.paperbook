import React, { useState } from 'react';

import { ActionResultEnum } from '../../../models/enums/actionResultTypes';
import { CookiesEnum } from '../../../models/enums/cookies';

import { removeCookie, setCookie } from '../../../services/cookies';

import { useActionResult } from '../../../hooks/useActionResult';
import { useCookies } from '../../../hooks/useCookies';
import { useShipping } from '../../../hooks/useShipping';

import { ShippingOptionData } from '../../../contexts/shippingContext';

import { useTheme } from 'styled-components';

import { cepValidation } from '../../../utils/validations';

import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import { ReactComponent as MapIcon } from '../../../assets/icons/map-marker.svg';

import ShippingOption from '../../molecules/ShippingOption';
import TextField from '../../molecules/TextField';
import {
    Container,
    CardTitle,
    TopicContainer,
    TopicTitle,
    CloseButtonContainer,
    AddressContainer,
    AddressIconContainer,
    InfoContainer,
    CityState,
    CEP,
    ChangeCEP,
    OptionContainer,
    CepContainer,
    UseCepButton
} from './styles';

interface ShippingCardProps {
    options: ShippingOptionData[];
    showOnlyOptions?: boolean;
    onClose(): void;
}

const ShippingCard: React.FC<ShippingCardProps> = ({
    options,
    onClose,
    showOnlyOptions
}: ShippingCardProps): JSX.Element => {
    const theme = useTheme();
    const {
        cep,
        setCep,
        getAddress,
        address,
        setAddress,
        option,
        setOption
    } = useShipping();
    const { show } = useActionResult();
    const { isCookiesAccepted } = useCookies();

    const [iconScale, setIconScale] = useState(1);
    const [selected, setSelected] = useState(option?.id || options[0]?.id || 1);
    const [cepText, setCepText] = useState('');

    const onCloseClick = (): void => {
        const container = document.getElementsByClassName(
            'shipping-card-container'
        )[0];
        container.classList.add('shipping-card-container-move-out');
        setTimeout(() => {
            onClose();
        }, 200);
    };

    const handleUseCepClick = async (): Promise<void> => {
        const addressRes = await getAddress(cepText);
        if (addressRes.erro) {
            show(
                'CEP inválido',
                'O CEP informado não existe ou não foi encontrado!',
                ActionResultEnum.ERROR
            );
        } else {
            setCep(cepText);
            if (isCookiesAccepted) setCookie(CookiesEnum.CEP, cepText, '/', 30);
            setAddress(addressRes);
        }
    };

    const handleChangeCepClick = (): void => {
        setCep('');
        setAddress();
        setOption();
        if (isCookiesAccepted) setCookie(CookiesEnum.CEP, '', '/', 0);
        removeCookie(CookiesEnum.CEP);
        setAddress(undefined);
    };

    const checkKeyboardKey = (
        event: React.KeyboardEvent<HTMLInputElement>,
        elementName: string
    ): void => {
        if (event.key === 'Enter') {
            document.getElementsByName(elementName)[0].blur();

            if (cepValidation(cepText)) {
                handleUseCepClick();
            }
        }
    };

    const iconSize = 24;

    return (
        <Container className="shipping-card-container shipping-card-container-move-in">
            <CardTitle>
                Opções de entrega {showOnlyOptions && `- ${cep}`}
            </CardTitle>
            <CloseButtonContainer onClick={onCloseClick}>
                <CloseIcon
                    onMouseEnter={() => setIconScale(1.2)}
                    onMouseLeave={() => setIconScale(1)}
                    color={theme.colors.defaultDarkGrey}
                    style={{
                        transition: 'all 0.3s',
                        transform: `scale(${iconScale})`
                    }}
                    height={iconSize}
                    width={iconSize}
                />
            </CloseButtonContainer>
            {!cep ? (
                <CepContainer>
                    <TextField
                        label="Informe o CEP"
                        name="cepInput"
                        onTextChange={setCepText}
                        type="text"
                        errorMessage="CEP inválido!"
                        validation={cepValidation}
                        length={8}
                        onKeyDown={(event) =>
                            checkKeyboardKey(event, 'cepInput')
                        }
                    />
                    <UseCepButton
                        onClick={handleUseCepClick}
                        disabled={!cepValidation(cepText)}
                    >
                        Usar
                    </UseCepButton>
                </CepContainer>
            ) : (
                <>
                    {!showOnlyOptions && (
                        <TopicContainer>
                            <TopicTitle>Endereço</TopicTitle>
                            <AddressContainer>
                                <AddressIconContainer>
                                    <MapIcon
                                        color={theme.colors.defaultBlue}
                                        height={iconSize}
                                        width={iconSize}
                                    />
                                </AddressIconContainer>
                                <InfoContainer>
                                    <CityState>
                                        {address?.localidade}, {address?.uf}
                                    </CityState>
                                    <CEP>CEP: {cep}</CEP>
                                </InfoContainer>
                                <ChangeCEP onClick={handleChangeCepClick}>
                                    Alterar
                                </ChangeCEP>
                            </AddressContainer>
                        </TopicContainer>
                    )}
                    <TopicContainer style={{ marginTop: 25 }}>
                        <TopicTitle>Envio</TopicTitle>
                        <OptionContainer>
                            {options?.map((option, index) => (
                                <ShippingOption
                                    key={option.id}
                                    name={option.name}
                                    daysToArrive={option.daysToArrive}
                                    price={option.price}
                                    isSelected={selected === option.id}
                                    onClick={() => {
                                        setSelected(option.id);
                                        setOption(option);
                                    }}
                                    style={{ marginTop: index !== 0 ? 10 : 5 }}
                                />
                            ))}
                        </OptionContainer>
                    </TopicContainer>
                </>
            )}
        </Container>
    );
};

export default ShippingCard;
