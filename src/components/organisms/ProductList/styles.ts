import styled from 'styled-components';

export const Container = styled.div`
    display: ${(props: { isNotVisible: boolean }) =>
        props.isNotVisible ? 'none' : 'block'};
    width: 100%;
    height: auto;
    margin-top: 120px;
    margin-bottom: -90px;
`;

export const TopicTitle = styled.h2`
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.defaultDarkBlue};

    margin-left: 50px;
`;

export const ChangePageIconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    min-height: 60px;
    height: 60px;
    min-width: 60px;
    width: 60px;

    cursor: pointer;
    border-radius: 70px;
    background-color: ${(props) => props.theme.colors.white};
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
    opacity: 0;

    transform: scale(0);

    transition: transform 0.2s, box-shadow 0.1s;

    &:hover {
        box-shadow: 0 1px 4px 2px rgba(0, 0, 0, 0.2);
    }

    &:active {
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
    }
`;

export const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${(props: { hasLess: boolean }) =>
        props.hasLess ? 'flex-start' : 'center'};
    align-items: center;
    position: relative;

    gap: 40px;
    padding: 30px 5px;
    min-height: 100px;
    height: auto;
    width: 100%;

    overflow: hidden;

    &:hover ${ChangePageIconContainer} {
        transform: scale(1);
    }
`;
