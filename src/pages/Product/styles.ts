import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    min-height: 100vh;
    width: 100%;

    background-color: ${(props) => props.theme.colors.background};
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    margin: 40px 10%;
    margin-bottom: 0;
    padding-bottom: 70px;

    @media (max-width: 1300px) {
        margin: 40px 1%;
        margin-bottom: 0;
    }

    @media (max-width: 1400px) {
        margin: 40px 7%;
        margin-bottom: 0;
    }
`;

export const PathContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 14px;

    margin-left: 30px;

    & > button.category-path-button {
        font-size: 0.9rem;
        color: ${(props) => props.theme.colors.defaultGrey};
        cursor: pointer;

        background-color: transparent;
        border: none;
        outline: none;

        transition: all 0.2s;

        :hover {
            color: ${(props) => props.theme.colors.defaultDarkBlue};
        }
    }
`;

export const PathDivider = styled.div`
    width: 1px;
    height: 20px;

    background-color: ${(props) => props.theme.colors.defaultGrey};
`;

export const CategoryPathContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

export const CategoryPath = styled.span`
    color: ${(props) => props.theme.colors.defaultBlue};
    cursor: pointer;

    transition: all 0.2s;

    &:hover {
        color: ${(props) => props.theme.colors.defaultDarkBlue};
    }
`;

export const ProductContainer = styled.div`
    display: flex;
    justify-content: space-around;
    position: relative;

    padding: 30px;

    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.white};
`;

export const ProductInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const ProductCardContainer = styled.div`
    width: 320px;
    margin-left: 30px;
`;

export const ImageContainer = styled.div`
    display: flex;
`;

export const ImagePreviewContainer = styled.div`
    height: 500px;
    width: auto;
    margin-left: 30px;
    margin-right: 140px;
    padding: 20px 30px;

    border-radius: 5px;
    overflow: hidden;

    @media (max-width: 1200px) {
        margin-right: 0;
    }

    &.mini {
        min-height: 70px;
        min-width: 70px;
        height: 70px;
        width: 70px;

        margin: 0;
        padding: 5px;

        cursor: pointer;
        border: 2px solid
            ${(props) => props.theme.colors.defaultHighlightGreyBlue}77;
    }

    & div.logo-icon {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;
    }

    & > img {
        width: 100%;
        height: 100%;

        object-fit: contain;
    }
`;

export const Description = styled.div`
    margin-top: 60px;

    & > h1 {
        font-size: 1.4rem;
        font-weight: 400;

        color: ${(props) => props.theme.colors.defaultDarkBlue};
    }

    & > p {
        margin-top: 10px;
    }
`;

export const CommentsContainer = styled.div`
    margin-top: 60px;

    & > h1 {
        font-size: 1.4rem;
        font-weight: 400;

        color: ${(props) => props.theme.colors.defaultDarkBlue};
    }
`;

export const Comment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & > p {
        color: ${(props) => props.theme.colors.defaultDarkGrey};
    }
`;
