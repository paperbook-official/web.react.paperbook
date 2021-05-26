import styled from 'styled-components';

import { ReactComponent as PaperBookIcon } from '../../../assets/icons/book-reader.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/pencil.svg';

export const EditIcon = styled(PlusIcon)`
    height: 50px;
    width: 50px;

    color: ${(props) => props.theme.colors.white};
`;

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    height: 100%;
    width: 100%;

    border: 1px solid ${(props) => props.theme.colors.defaultGrey}33;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;

    & img {
        width: 100%;
        height: 100%;

        object-fit: contain;
        object-position: center;
    }

    & .overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;

        height: 100%;
        width: 100%;

        opacity: 0;
        background-color: ${(props) => props.theme.colors.defaultDarkGrey}44;

        transition: all 0.3s ease;
    }

    & .overlay > .circle {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 90px;
        width: 90px;

        border-radius: 150px;
        background-color: #0006;

        transition: all 0.2s ease;

        :hover {
            background-color: #0008;
        }
    }

    & input {
        position: absolute;
        visibility: hidden;
        max-height: 1px;
    }

    &:hover .overlay {
        opacity: 1;
    }
`;

export const BookReader = styled(PaperBookIcon)`
    height: 70%;
    width: 70%;

    color: ${(props) => props.theme.colors.defaultGrey};
`;
