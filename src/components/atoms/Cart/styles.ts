import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    width: auto;
`;

export const CartCounter = styled.span`
    position: absolute;
    top: -10px;
    color: ${(props) => props.theme.colors.defaultYellow};
`;
