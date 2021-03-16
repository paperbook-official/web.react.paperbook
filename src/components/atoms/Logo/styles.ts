import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    width: auto;
`;

export const Title = styled.span`
    color: ${(props) => props.theme.colors.defaultLightGrey};
    font-family: Quando, serif;
    font-size: 1.4rem;

    margin-left: 20px;
`;
