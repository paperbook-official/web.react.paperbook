import styled, { DefaultTheme } from 'styled-components';

export const CardContainer = styled.div`
    width: 309px;
    height: 182px;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;

    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 18px 15px;

    & .username {
        display: flex;
        justify-content: space-between;

        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
    }
    & .username .delete_button {
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;

        cursor: pointer;

        border: none;
        background-image: none;
        background-color: transparent;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }

    & p {
        font-size: 20px;
        line-height: 30px;
    }

    & a {
        margin-top: 15px;
        font-size: 15px;
        color: #1f5eff;

        cursor: pointer;
    }
`;
