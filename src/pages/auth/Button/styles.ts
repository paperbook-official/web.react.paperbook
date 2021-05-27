import styled from 'styled-components';

export const Label = styled.span`
    color: ${(props) => props.theme.colors.defaultDarkBlue};
    font-size: 1.3rem;
    font-weight: 500;

    transition: all 0.3s;
`;

export const Container = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 210px;
    height: 60px;

    border: 3px solid ${(props) => props.theme.colors.defaultDarkBlue};
    border-radius: 150px;
    background-color: transparent;
    outline: none;
    cursor: pointer;

    transition: all 0.3s;

    &:hover {
        border-color: transparent;
        background-color: ${(props) => props.theme.colors.defaultDarkBlue};
        transform: translateY(-5px);
    }

    &:hover ${Label} {
        color: ${(props) => props.theme.colors.defaultLightGrey};
    }

    &.disabled {
        pointer-events: none;
        border: 3px solid ${(props) => props.theme.colors.defaultGrey};
        background-color: transparent;
        cursor: default;
        transform: translateY(0);
    }

    &.disabled ${Label} {
        color: ${(props) => props.theme.colors.defaultGrey};
    }

    &.loading {
        border: transparent;
        background-color: transparent;
        cursor: default;
        transform: translateY(0);
    }
`;
