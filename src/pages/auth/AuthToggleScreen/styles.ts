import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const ClickableText = styled.span`
    color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
    font-size: 1.1rem;
    font-weight: 500;

    cursor: pointer;

    transition: all 0.2s;

    &:hover {
        color: ${(props) => props.theme.colors.defaultBlue};
    }
`;
