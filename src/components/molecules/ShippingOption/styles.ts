import styled from 'styled-components';

interface ShippingOptionStyleProps {
    isSelected?: boolean;
}

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    cursor: pointer;

    padding: 15px 5px;
    margin-top: 5px;

    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.defaultGrey}5A;

    transition: all 0.3s;

    &:hover {
        background-color: ${(props) =>
            props.theme.colors.defaultHighlightGreyBlue}4A;
        transform: scale(1.02);
    }
`;

export const SelectedContainer = styled.div`
    position: relative;
    margin-left: 15px;
    height: 20px;
    width: 20px;

    border: 1px solid ${(props) => props.theme.colors.defaultHighlightGreyBlue};
    border-radius: 30px;

    &::before {
        content: '';
        display: ${(props: ShippingOptionStyleProps) =>
            props.isSelected ? 'block' : 'none'};
        position: absolute;
        top: calc(50% - 6px);
        left: calc(50% - 6px);
        height: 12px;
        width: 12px;
        border-radius: 20px;

        background-color: ${(props) =>
            props.theme.colors.defaultHighlightGreyBlue};
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin: 0 20px;
`;

export const ServiceName = styled.span`
    color: ${(props) => props.theme.colors.defaultDarkerGrey};
    width: 100px;
`;

export const ArriveDate = styled.span`
    color: ${(props) => props.theme.colors.defaultDarkerGrey};
    width: 292px;
`;

export const Price = styled.span`
    color: ${(props) => props.theme.colors.defaultDarkerGrey};
`;
