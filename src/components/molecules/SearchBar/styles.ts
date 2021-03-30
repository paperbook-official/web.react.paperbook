import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    width: 32%;
    min-width: 250px;
    height: 30px;

    background-color: ${(props) => props.theme.colors.white}40;
    border-radius: 5px;
    overflow: hidden;
`;

export const SearchLabel = styled.label`
    position: absolute;
    top: 3px;
    left: 16px;
    color: #fff;
    pointer-events: none;
    display: block;
    transition: 0.1s;
`;

export const SearchInput = styled.input`
    width: 84%;
    height: 100%;

    margin: 0 16px;

    outline: none;
    background: transparent;
    border: none;
    box-shadow: none;

    color: #fff;

    &:focus ~ ${SearchLabel}, &:valid ~ ${SearchLabel} {
        color: transparent;
    }
`;
