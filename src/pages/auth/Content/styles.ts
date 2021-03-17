import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    pointer-events: none;

    width: 40%;
`;

export const Title = styled.span`
    color: ${(props) => props.theme.colors.defaultLightGrey};
    font-family: Quando;
    font-size: 4rem;
`;

export const Subtitle = styled.span`
    color: ${(props) => props.theme.colors.defaultLightGrey};
    font-family: Quando;
    font-size: 1.4rem;

    margin-top: 10px;
`;
