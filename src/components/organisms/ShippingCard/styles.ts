import styled, { DefaultTheme } from 'styled-components';

interface CEPButtonProps {
    theme: DefaultTheme;
    disabled: boolean;
}

export const Container = styled.div`
    position: relative;
    width: 600px;
    height: auto;
    padding: 25px 30px;

    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.white};

    transform: scale(0);

    &.shipping-card-container-move-in {
        animation-name: shippingcardmovein;
        animation-duration: 0.4s;
        animation-fill-mode: forwards;
        animation-delay: 0s;
    }

    &.shipping-card-container-move-out {
        animation-name: shippingcardmoveout;
        animation-duration: 0.2s;
        animation-fill-mode: forwards;
        animation-delay: 0s;
    }

    @keyframes shippingcardmovein {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }

    @keyframes shippingcardmoveout {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(0);
        }
    }
`;

export const CardTitle = styled.span`
    font-size: 1.2rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.defaultDarkerGrey};
    margin-left: 5px;
`;

export const CloseButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    right: 35px;
    top: 25px;

    height: 30px;
    width: 30px;
    border-radius: 40px;

    cursor: pointer;
`;

export const CepContainer = styled.div`
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: auto;
    margin-top: 30px;
`;

export const UseCepButton = styled.button`
    width: 100px;
    height: 35px;
    margin-left: 35px;

    cursor: ${(props: CEPButtonProps) => (props.disabled ? '' : 'pointer')};
    outline: none;
    border: none;
    border-radius: 5px;

    color: ${(props) => props.theme.colors.white};
    background-color: ${(props: CEPButtonProps) =>
        props.disabled
            ? props.theme.colors.defaultGrey
            : props.theme.colors.defaultHighlightGreyBlue};

    transition: all 0.3s;

    &:hover {
        background-color: ${(props: CEPButtonProps) =>
            props.disabled
                ? props.theme.colors.defaultGrey
                : props.theme.colors.defaultHighlightGreyBlue + 'DD'};
        transform: ${(props: CEPButtonProps) =>
            props.disabled ? '' : 'translateY(-4px)'};
    }
`;

export const TopicContainer = styled.div`
    width: 100%;
    height: auto;
    margin-top: 30px;
`;

export const TopicTitle = styled.span`
    font-size: 1rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.defaultDarkGrey};
    margin-left: 2px;
    padding: 5px;
`;

export const AddressContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 15px 5px;
    margin-top: 5px;

    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.defaultGrey}5A;
`;

export const AddressIconContainer = styled.div`
    margin-left: 15px;
`;

export const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    margin: 0 20px;
`;

export const CityState = styled.span`
    color: ${(props) => props.theme.colors.defaultDarkerGrey};
`;

export const CEP = styled.span`
    color: ${(props) => props.theme.colors.defaultDarkerGrey};
`;

export const ChangeCEP = styled.span`
    font-size: 0.85rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
    margin-right: 15px;
    margin-left: 5px;

    cursor: pointer;

    transition: all 0.3s;

    &:hover {
        color: ${(props) => props.theme.colors.defaultBlue};
    }
`;

export const OptionContainer = styled.div``;
