import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

export const PageButton = styled.button`
    height: 40px;
    width: 40px;

    cursor: pointer;
    color: ${(props) => props.theme.colors.defaultGrey};
    border: none;
    border-radius: 5px;
    outline: none;

    transition: all 0.2s;

    &.selected {
        background-color: ${(props) => props.theme.colors.defaultGrey}22;
        color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
        font-weight: 500;
    }

    &:hover {
        background-color: ${(props) => props.theme.colors.defaultGrey}44;
    }

    &.disabled {
        background-color: transparent;
        color: ${(props) => props.theme.colors.defaultGrey}99;
        font-weight: 300;
        cursor: default;
    }
`;
