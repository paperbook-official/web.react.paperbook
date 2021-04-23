import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;

    width: 100%;
    height: 260px;

    padding: 30px 60px;

    background-color: ${(props) => props.theme.colors.defaultDarkBlue};

    & > div.first,
    & > div.second,
    & > div.third {
        width: 300px;
    }

    & > div.second {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 40px;

        > .icon {
            cursor: pointer;
            transition: all 0.3s;

            :hover {
                transform: scale(1.1);
            }
        }
    }

    & > div.third {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 10px;

        position: relative;

        > h2 {
            color: ${(props) => props.theme.colors.white};
            font-weight: 400;
            font-size: 1.4rem;
        }
    }

    & p {
        color: ${(props) => props.theme.colors.white};
        font-weight: 400;
        font-size: 0.95rem;

        margin: 18px 0 30px 0;
    }

    @media (max-width: 1100px) {
        & > div.second {
            flex-direction: column;
            gap: 20px;
        }
    }
`;

export const CopyrightContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 40px;

    background-color: ${(props) => props.theme.colors.defaultDarkBlue}DD;

    color: ${(props) => props.theme.colors.defaultGrey};
    font-size: 0.9rem;
`;

export const SubjectInputContainer = styled.div`
    position: relative;
    width: 100%;
    height: 40px;

    border: 1px solid ${(props) => props.theme.colors.defaultDarkGrey}55;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.defaultDarkGrey}55;
    overflow: hidden;
`;

export const SubjectLabel = styled.label`
    display: block;
    position: absolute;
    top: 50%;
    left: 16px;

    color: ${(props) => props.theme.colors.defaultGrey};
    pointer-events: none;

    transform: translateY(-50%);

    transition: all 0.2s;
`;

export const SubjectInput = styled.input`
    width: 90%;
    height: 100%;

    margin: 0 5%;

    outline: none;
    background: transparent;
    border: none;
    box-shadow: none;

    color: ${(props) => props.theme.colors.white};

    &:focus ~ ${SubjectLabel}, &:valid ~ ${SubjectLabel} {
        opacity: 0;
    }
`;

export const ContentInputContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100px;

    border: 1px solid ${(props) => props.theme.colors.defaultDarkGrey}55;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.defaultDarkGrey}55;
    overflow: hidden;
`;

export const ContentInputLabel = styled.label`
    display: block;
    position: absolute;
    top: 10px;
    left: 16px;

    color: ${(props) => props.theme.colors.defaultGrey};
    pointer-events: none;

    transition: all 0.2s;
`;

export const ContentInputArea = styled.textarea`
    width: 90%;
    height: 100%;

    color: ${(props) => props.theme.colors.white};
    font-size: 0.95rem;
    resize: none;

    margin: 11px 5%;

    outline: none;
    border: none;
    background: transparent;
    box-shadow: none;

    &:focus ~ ${ContentInputLabel}, &:valid ~ ${ContentInputLabel} {
        opacity: 0;
    }
`;

export const SendButton = styled.button`
    align-self: flex-end;

    color: ${(props) => props.theme.colors.white};

    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    box-shadow: none;

    transition: all 0.3s;

    &:hover {
        text-shadow: 0px 0px 4px ${(props) => props.theme.colors.defaultBlue};
    }

    &.disabled {
        text-shadow: none;
        color: ${(props) => props.theme.colors.defaultMidGrey};
        cursor: default;
    }
`;
