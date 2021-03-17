import styled from 'styled-components';

const size = 20;

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${size}px;
    height: ${size}px;

    background-color: ${(props) => props.theme.colors.defaultDarkBlue}44;
    border-radius: ${size + 10}px;
    border: 1px solid ${(props) => props.theme.colors.defaultDarkBlue};

    transition: all 0.2s;

    &:hover {
        border-color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
        background-color: ${(props) =>
            props.theme.colors.defaultHighlightGreyBlue}44;
    }
`;
