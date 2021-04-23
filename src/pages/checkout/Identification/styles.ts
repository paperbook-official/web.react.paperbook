import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    min-height: 100vh;
    width: 100%;

    background-color: ${(props) => props.theme.colors.background};
`;

export const Content = styled.div`
    position: relative;

    min-height: 500px;
    height: 100%;
    width: 80%;

    margin: 60px 10% 60px 10%;
    padding: 20px;

    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.white};

    & > div.divider {
        height: 1px;
        width: 100%;

        margin: 10px 0 20px 0;

        background-color: ${(props) => props.theme.colors.defaultGrey}88;
    }

    & > div.loading-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 380px;
    }
`;

export const Title = styled.h1`
    font-size: 1.4rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.defaultDarkBlue};
`;

export const IdentificationContainer = styled.div`
    display: flex;
    gap: 40px;
    position: relative;

    margin: 0 10px;
    padding: 10px 0;

    min-height: 400px;

    & h3 {
        color: ${(props) => props.theme.colors.defaultDarkBlue};
        font-size: 1.1rem;
        font-weight: 500;

        margin-left: 5px;
        margin-bottom: 36px;
    }

    & div.vertical-divider {
        position: absolute;
        right: 310px;
        top: 0;

        height: 100%;
        width: 1px;

        background-color: ${(props) => props.theme.colors.defaultGrey}66;
    }
`;

export const FieldsContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    padding-right: 20px;

    & > div.row-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 35px;
    }
`;

export const AddressesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    width: 300px;

    & > h2 {
        color: ${(props) => props.theme.colors.defaultDarkBlue};
        font-size: 1.2rem;
        font-weight: normal;
    }
`;

export const ActionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
`;

export const ActionButton = styled.button`
    height: 40px;
    width: 150px;

    color: ${(props) => props.theme.colors.background};
    font-weight: 500;

    cursor: pointer;
    border: none;
    border-radius: 50px;
    background-color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
    box-shadow: 0;
    outline: none;

    transition: all 0.3s;

    &.secondary {
        color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
        background-color: ${(props) => props.theme.colors.defaultBlue}33;
    }

    &:hover {
        background-color: ${(props) =>
            props.theme.colors.defaultHighlightGreyBlue}CC;
    }

    &.secondary:hover {
        background-color: ${(props) => props.theme.colors.defaultBlue}55;
    }

    &.disabled {
        cursor: default;
        color: ${(props) => props.theme.colors.white};
        background-color: ${(props) => props.theme.colors.defaultGrey};
    }
`;
