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
    text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
`;

export const Subtitle = styled.span`
    color: ${(props) => props.theme.colors.defaultLightGrey};
    font-family: Quando;
    font-size: 1.4rem;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 1);

    margin-top: 10px;
`;
