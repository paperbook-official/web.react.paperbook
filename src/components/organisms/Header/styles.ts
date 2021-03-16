import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 80px;
    padding: 0 35px;

    background-color: ${(props) => props.theme.colors.defaultDarkBlue};
`;

export const AuthOptionsContainer = styled.div``;

export const AuthOption = styled.span`
    margin-right: 30px;
    color: ${(props) => props.theme.colors.defaultLightGrey};
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        color: ${(props) => props.theme.colors.defaultGrey};
    }
`;
