import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;

    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.defaultDarkGrey};
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

export const AmountInput = styled.input`
    width: 34px;
    height: 34px;

    margin-left: 8px;

    text-align: center;
    color: ${(props) => props.theme.colors.defaultDarkBlue};
    pointer-events: none;
    border: 1px solid ${(props) => props.theme.colors.defaultGrey}55;
`;

export const AmountModsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const StockAmount = styled.span`
    display: flex;
    align-items: center;
    gap: 5px;

    margin-left: 10px;

    font-size: 0.85rem;

    & > span {
        font-size: 1rem;
        color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
    }
`;
