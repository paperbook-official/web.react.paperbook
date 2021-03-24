import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    width: 100%;
    height: 100vh;

    background-color: ${(props) => props.theme.colors.background};
`;
