import styled from 'styled-components';

interface TextButtonProps {
    textColor: string;
    backgroundColor: string;
    textColorHover: string;
    backgroundColorHover: string;
}

export const Container = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;

    width: 340px;
    height: 150px;
    border-radius: 5px;
    padding: 20px;

    background-color: ${(props) => props.theme.colors.defaultDarkBlue};
`;

export const CookieText = styled.span`
    color: ${(props) => props.theme.colors.defaultLightGrey};
    font-size: 1.1rem;
`;

export const ActionContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    height: auto;
`;

export const TextButton = styled.div`
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;

    color: ${(props: TextButtonProps) => props.textColor};
    background-color: ${(props: TextButtonProps) => props.backgroundColor};

    transition: all 0.2s;

    &:hover {
        color: ${(props: TextButtonProps) => props.textColorHover};
        background-color: ${(props: TextButtonProps) =>
            props.backgroundColorHover};
    }
`;
