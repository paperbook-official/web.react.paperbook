import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: ${(props: { isLoading: boolean }) =>
        props.isLoading ? 'center' : 'space-between'};
    position: absolute;
    top: 50%;
    right: 25%;

    height: 210px;
    width: 320px;
    padding: 10px 20px;

    cursor: pointer;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.defaultDarkBlue}99;
    overflow: hidden;

    transform: translate(25%, -50%);
    transition: all 0.3s;

    &:hover {
        background-color: ${(props) => props.theme.colors.defaultDarkBlue}DD;
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;

    height: 100%;
    width: 50%;
`;

export const Title = styled.span`
    font-size: 1.1rem;
    color: ${(props) => props.theme.colors.background};
`;

export const Price = styled.span`
    color: ${(props) => props.theme.colors.background};
    font-weight: 600;
    font-size: 1.2rem;

    &.full-price {
        font-size: 0.9rem;
        font-weight: 400;
        text-decoration: line-through;
        color: ${(props) => props.theme.colors.defaultGrey};
    }
`;

export const ImageContainer = styled.div`
    position: relative;
    height: 100%;
    width: 48%;
    padding: 10px 15px;

    & div.logo-icon {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;
    }

    & img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`;
