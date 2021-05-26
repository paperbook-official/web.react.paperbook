import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    width: 500px;
    height: 600px;

    padding: 20px 30px;

    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.background};

    & div.field-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 10px;

        width: 100%;
        height: 70px;
    }

    & .category-selector {
        width: 100%;
    }

    & .category-selector-control {
        padding: 2px 10px;
        border: none;

        > span.rest {
            margin-left: 5px;
            color: ${(props) => props.theme.colors.defaultBlue};
        }
    }

    & .category-selector-control.empty {
        color: ${(props) => props.theme.colors.defaultGrey};
    }
`;

export const FirstContainer = styled.div`
    display: flex;
    flex-direction: row;

    width: 100%;
`;

export const ImagePickerContainer = styled.div`
    width: 47%;
    height: 100%;
`;

export const FieldsContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
`;

export const SecondContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CreateButton = styled.button`
    height: 40px;
    width: 100px;

    color: ${(props) => props.theme.colors.white};
    letter-spacing: 1px;

    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.defaultDarkBlue};
    outline: none;
    cursor: pointer;

    transition: all 0.3s;

    &:hover {
        background-color: ${(props) =>
            props.theme.colors.defaultHighlightGreyBlue};
    }

    &.disabled {
        background-color: ${(props) => props.theme.colors.defaultGrey};
        pointer-events: none;
    }
`;
