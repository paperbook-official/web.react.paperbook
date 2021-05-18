import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;

    min-width: 40px;
    max-width: 140px;

    padding: 2px 10px;
    z-index: 10000;

    pointer-events: none;

    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.defaultDarkGrey}99;
    color: ${(props) => props.theme.colors.white};
    opacity: 1;

    transition: opacity 0.3s;
`;
