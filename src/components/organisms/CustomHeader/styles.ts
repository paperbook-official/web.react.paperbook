import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 70%;
    height: 80px;
    padding: 0 35px;

    transform: translateX(-50%);
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
