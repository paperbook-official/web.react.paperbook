import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
`;

export const SelectorContainer = styled.div`
    display: flex;
    flex-direction: column;

    position: absolute;
    top: 50px;
    left: 2.5%;

    width: 95%;

    transform-origin: top center;
    transform: rotateX(-90deg);

    transition: all 0.125s ease;

    background-color: ${(props) => props.theme.colors.white};
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);

    & > span {
        color: ${(props) => props.theme.colors.defaultDarkGrey};
        pointer-events: none;
    }
`;

export const SelectorRow = styled.div`
    display: flex;
    align-items: center;

    width: 100%;
    height: 40px;
    padding: 0 10px;

    cursor: pointer;
    border-bottom: 1px solid ${(props) => props.theme.colors.defaultGrey}55;

    color: ${(props) => props.theme.colors.defaultDarkGrey};

    transition: all 0.3s ease;

    &:hover {
        background-color: ${(props) => props.theme.colors.defaultGrey}33;
    }
`;

export const Select = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 300px;
    height: 50px;
    padding: 0 10px;

    cursor: pointer;
    border: 1px solid ${(props) => props.theme.colors.defaultHighlightGreyBlue};
    border-radius: 10px;
    background-color: transparent;

    & > .toggle-icon {
        margin-left: 5px;
        transform: rotateZ(-90deg);
        color: ${(props) => props.theme.colors.defaultDarkGrey};

        transition: color 0.3s, transform 0.4s;
    }

    &.active > .toggle-icon {
        transform: rotateZ(90deg);
        color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
    }

    &.active ~ ${SelectorContainer} {
        transform: rotateX(0deg);
    }

    &.reversed ~ ${SelectorContainer} {
        transform-origin: bottom center;
        flex-direction: column-reverse;
        top: auto;
        bottom: 50px;
    }
`;
