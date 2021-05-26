import styled from 'styled-components';

import { ReactComponent as check } from '../../../assets/icons/check.svg';

export const Container = styled.div`
    position: relative;

    height: 230px;
    width: 600px;

    padding: 20px 30px;

    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.white};

    transition: all 0.3s ease, transform 0.2s ease-out;

    &.step-2,
    &.step-3 {
        height: 190px;
        width: 500px;
    }

    &.step-3 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

export const Title = styled.h1`
    color: ${(props) => props.theme.colors.defaultDarkGrey};
    font-size: 1.2rem;
    font-weight: 500;

    margin-bottom: 10px;
`;

export const FieldsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;

    margin-top: 30px;
`;

export const ActionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    margin-top: 40px;

    transition: all 0.3s ease;
`;

export const ActionButton = styled.button`
    border: none;
    border-radius: 5px;
    background-color: transparent;
    cursor: pointer;

    color: ${(props) => props.theme.colors.defaultDarkBlue};

    transition: all 0.3s;

    &:hover {
        color: ${(props) => props.theme.colors.defaultBlue};
    }

    &.secondary {
        color: ${(props) => props.theme.colors.defaultDarkGrey}AA;
    }

    &.secondary:hover {
        color: ${(props) => props.theme.colors.defaultDarkBlue};
    }

    &.disabled {
        color: ${(props) => props.theme.colors.defaultGrey};
        cursor: default;
        pointer-events: none;
    }

    &.hidden {
        opacity: 0;
        pointer-events: none;
    }
`;

export const CheckIcon = styled(check)`
    height: 60px;
    width: 60px;

    color: ${(props) => props.theme.colors.defaultLightGreen};

    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    & ~ h1.check-text {
        color: ${(props) => props.theme.colors.defaultDarkGrey};
        font-weight: 500;
        font-size: 1.1rem;
    }
`;
