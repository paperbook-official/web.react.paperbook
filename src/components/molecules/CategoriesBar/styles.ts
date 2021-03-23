import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 30px;

    position: absolute;
    top: 80px;
    left: 50%;

    height: 40px;

    transform: translateX(-50%);
`;

export const Category = styled.span`
    font-size: 1rem;
    color: ${(props) => props.theme.colors.background};
    cursor: pointer;

    transition: all 0.2s;

    &:hover {
        font-size: 1.1rem;
        color: ${(props) => props.theme.colors.defaultGrey};
    }
`;
