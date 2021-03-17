import styled from 'styled-components';

const size = 34;

export const Container = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${size}px;
    height: ${size}px;

    cursor: pointer;
    background-color: transparent;
    border-radius: ${size + 10}px;
    border: 2px solid ${(props) => props.theme.colors.defaultLightGrey};

    transition: all 0.2s;

    &:hover {
        transform: scale(1.1);
        border-color: ${(props) => props.theme.colors.defaultGrey};
    }
`;
