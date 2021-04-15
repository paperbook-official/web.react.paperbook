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
    color: ${(props) => props.theme.colors.defaultLightGrey};
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        color: ${(props) => props.theme.colors.defaultGrey};
    }
`;

export const ProgressContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    gap: 80px;
`;

export const ProgressNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 80px;

    & > span {
        color: ${(props) => props.theme.colors.defaultGrey};
    }

    & > span.active {
        color: ${(props) => props.theme.colors.defaultLightGreen};
    }
`;

export const ProgressBar = styled.div`
    position: absolute;
    top: 36px;

    height: 4px;
    width: 110px;

    border-radius: 50px;
    background-color: ${(props) => props.theme.colors.defaultGrey};

    &.first {
        left: 66px;
    }

    &.second {
        left: 226px;
    }

    &.active {
        background-color: ${(props) => props.theme.colors.defaultLightGreen};
    }
`;
