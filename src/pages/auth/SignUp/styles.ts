import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    height: 100vh;
    width: 100vw;
    background-color: #000000;
`;

export const BackgroundImage = styled.img`
    position: absolute;

    height: 100%;
    width: 100%;

    object-fit: cover;
`;

export const GradientOverlay = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;

    background: linear-gradient(
        90deg,
        rgba(32, 32, 32, 0.6) 0%,
        rgba(32, 32, 32, 0) 69.95%
    );
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    position: absolute;
    right: 0;
    padding: 10px;

    width: 400px;
    height: 100%;

    background-color: ${(props) => props.theme.colors.background};
    box-shadow: -4px 0 4px 2px rgba(0, 0, 0, 0.2);
`;

export const CardTitle = styled.div`
    color: ${(props) => props.theme.colors.defaultDarkBlue};
    font-weight: 500;
    font-size: 1.6rem;

    margin-top: 70px;
`;

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const FieldsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 240px;

    margin-top: 30px;
`;

export const FullNameContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
`;

export const FieldsFooterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80%;
    margin-top: 30px;
`;

export const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const Terms = styled.span`
    cursor: pointer;
    color: ${(props) => props.theme.colors.defaultHighlightGreyBlue};
    font-weight: 500;
`;
