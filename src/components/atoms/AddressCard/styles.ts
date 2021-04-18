import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    width: 270px;

    cursor: pointer;
    background-color: ${(props) => props.theme.colors.background};
    border-radius: 10px;
    padding: 14px;

    transition: all 0.3s;

    & > span {
        font-size: 0.9rem;
        line-height: 1.1rem;
    }

    & span.username {
        font-size: 1.1rem;
        line-height: 1.7rem;
        font-weight: 500;
    }

    & div.delete-button {
        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        top: 10px;
        right: 10px;

        height: 30px;
        width: 30px;

        cursor: pointer;

        border-radius: 60px;
        background-color: transparent;

        transition: all 0.3s;

        :hover {
            background-color: ${(props) => props.theme.colors.defaultGrey}55;
        }
    }

    & > div.change-address-container {
        margin-top: 5px;
    }

    &:hover {
        background-color: ${(props) => props.theme.colors.defaultLightGrey};
        box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.2);
    }
`;

export const ChangeAddressButton = styled.span`
    font-size: 0.85rem;
    color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};

    cursor: pointer;

    &:hover {
        color: ${(props) => props.theme.colors.defaultBlue};
    }
`;
