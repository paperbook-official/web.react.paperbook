import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    display: flex;
    align-items: 'center';
    gap: 10px;
    z-index: 5;
`;

export const PrependText = styled.span`
    font-size: 1rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
`;

export const SortOption = styled.span`
    position: relative;

    text-align: center;
    font-size: 1rem;
    font-weight: 400;
    color: ${(props) => props.theme.colors.defaultDarkGrey};

    transition: all 0.3s;
`;

export const DropdownContainer = styled.div`
    display: none;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 5px;
    top: 25px;
    opacity: 0;

    transition: all 0.3s;
`;

export const SortOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    width: 160px;

    border-radius: 5px;
    box-shadow: 0 1px 4px 0px rgba(0, 0, 0, 0.2);
    background-color: ${(props) => props.theme.colors.white};
    overflow: hidden;

    & > ${SortOption} {
        width: 100%;
        padding: 5px 0;
        font-size: 0.87rem;

        cursor: pointer;
        border-bottom: 1px solid ${(props) => props.theme.colors.defaultGrey}55;
        background: transparent;
    }

    & > ${SortOption}:hover {
        background: ${(props) => props.theme.colors.defaultGrey}3A;
    }

    & > ${SortOption}::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 100%;
        background-color: ${(props) => props.theme.colors.defaultBlue};

        transition: all 0.3s;
    }

    & > ${SortOption}.selected::after {
        width: 5px;
    }
`;

export const DropdownToggle = styled.div`
    display: flex;
    flex-direction: row;

    cursor: pointer;

    & > .toggle-icon {
        margin-left: 5px;
        transform: rotateZ(-90deg);
        color: ${(props) => props.theme.colors.defaultDarkGrey};

        transition: color 0.3s, transform 0.4s;
    }

    &:hover > ${SortOption}, &:hover > .toggle-icon {
        color: ${(props) => props.theme.colors.defaultDarkGrey}88;
    }

    &.active > .toggle-icon {
        transform: rotateZ(90deg);
        color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
    }

    &.active ~ ${DropdownContainer} {
        display: flex;
        opacity: 1;
    }
`;
