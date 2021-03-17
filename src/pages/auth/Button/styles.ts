import styled from 'styled-components';

export const Label = styled.span`
    color: ${(props) => props.theme.colors.defaultDarkBlue};
    font-size: 1.3rem;
    font-weight: 500;

    transition: all 0.3s;
`;

export const Container = styled.button`
    cursor: pointer;
    outline: none;
    background-color: transparent;
    border: 3px solid ${(props) => props.theme.colors.defaultDarkBlue};
    border-radius: 150px;

    width: 210px;
    height: 60px;

    transition: all 0.3s;

    &:hover {
        border-color: transparent;
        background-color: ${(props) => props.theme.colors.defaultDarkBlue};
        transform: translateY(-5px);
    }

    &:hover ${Label} {
        color: ${(props) => props.theme.colors.defaultLightGrey};
    }
`;
