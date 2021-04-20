import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    min-height: 100vh;
    width: 100%;
    padding-bottom: 20px;

    background-color: ${(props) => props.theme.colors.background};
`;

export const Content = styled.div`
    position: relative;

    min-height: 500px;
    height: 100%;
    width: 70%;
    margin: 30px 15% 0 15%;
    padding: 20px;

    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.white};

    & > div.divider {
        height: 1px;
        width: 100%;

        margin: 10px 0 20px 0;

        background-color: ${(props) => props.theme.colors.defaultGrey}88;
    }

    & > div.loading-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 380px;
    }
`;

export const Title = styled.h1`
    font-size: 1.4rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.defaultDarkBlue};
`;

export const PaymentContainer = styled.div`
    display: flex;
    gap: 40px;
    position: relative;

    margin: 0 10px;
    padding: 10px 0;

    min-height: 400px;

    & h3 {
        color: ${(props) => props.theme.colors.defaultDarkBlue};
        font-size: 1.1rem;
        font-weight: 500;

        margin-left: 5px;
        margin-bottom: 36px;
    }

    & div.vertical-divider {
        position: absolute;
        right: 50%;
        top: 0;

        height: 100%;
        width: 1px;

        background-color: ${(props) => props.theme.colors.defaultGrey}66;
    }
`;

export const FieldsContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 50%;
    padding-right: 20px;

    & > div.row-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 35px;
    }

    & > div.button-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;

        margin-top: 30px;
    }
`;

export const Button = styled.button`
    height: 40px;
    width: 160px;

    color: ${(props) => props.theme.colors.background};
    font-size: 1.1rem;

    cursor: pointer;
    border: none;
    border-radius: 100px;
    background-color: ${(props) => props.theme.colors.defaultLightGreen};
    outline: none;

    transition: all 0.3s;

    &:hover {
        background-color: ${(props) => props.theme.colors.defaultLightGreen}BB;
    }

    &.secondary {
        width: 60px;
        height: auto;

        color: ${(props) => props.theme.colors.defaultGrey};
        background-color: transparent;
    }

    &.secondary:hover {
        color: ${(props) => props.theme.colors.defaultMidGrey};
    }

    &.check-order {
        width: 240px;
        height: 50px;

        background-color: ${(props) =>
            props.theme.colors.defaultHighlightGreyBlue};
    }

    &.disabled {
        color: white;
        background-color: ${(props) => props.theme.colors.defaultGrey};
        cursor: default;
    }
`;

export const CreditCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 50%;
`;

export const CreditCard = styled.div`
    position: relative;

    min-width: 300px;
    width: 300px;
    height: 180px;
    perspective: 600px;
    margin-top: 20px;

    & .credit-card {
        position: absolute;
        width: 100%;
        height: 100%;

        color: #f5f5f5;

        border-radius: 5px;

        transition: all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform-style: preserve-3d;
        backface-visibility: hidden;
    }

    & > .front,
    & > .back {
        width: 100%;
        height: 100%;
    }

    & > .front {
        display: flex;
        flex-direction: column;
        padding: 14px 20px;

        background: linear-gradient(
            107.21deg,
            ${(props) => props.theme.colors.defaultHighlightGreyBlue} 0%,
            ${(props) => props.theme.colors.defaultBlue} 100%
        );

        transform: rotateY(0deg);

        .paperbook-logo {
            align-self: flex-end;
        }

        .card-number {
            margin-top: 5px;
            font-size: 1.4rem;
        }

        .card-holder {
            position: absolute;
            bottom: 24px;
            left: 20px;

            font-size: 0.9rem;
        }

        .expiration-date {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            align-self: flex-end;

            position: absolute;
            bottom: 20px;
            right: 30px;

            > .exp-string {
                font-size: 0.7rem;
            }

            > .exp-container {
                display: flex;
                flex-direction: row;
                justify-content: center;
                gap: 3px;

                position: relative;
                width: 48px;

                font-size: 0.9rem;

                .exp-month,
                .exp-year {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    position: absolute;
                    width: 16px;

                    text-align: center;
                    font-size: 0.9rem;
                }

                .exp-month {
                    left: 0;
                }

                .exp-year {
                    right: 0;
                }
            }
        }
    }

    & > .back {
        display: flex;
        flex-direction: column;
        padding: 14px 0;

        background: linear-gradient(
            72.46deg,
            ${(props) => props.theme.colors.defaultBlue} 0%,
            ${(props) => props.theme.colors.defaultHighlightGreyBlue} 100%
        );

        transform: rotateY(-180deg);

        .card-black-bar {
            width: 100%;
            height: 40px;

            margin-top: 10px;

            background-color: #333;
        }

        .card-secret-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            align-self: center;

            margin-top: 10px;
        }

        .card-secret-bar {
            width: 200px;
            height: 36px;

            border-radius: 5px;

            background: repeating-linear-gradient(
                45deg,
                #ededed,
                #ededed 5px,
                white 5px,
                white 10px
            );
        }

        .card-secret {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 40px;
            height: 30px;

            margin-left: -1px;

            background-color: #fff;
            border-radius: 0 10px 10px 0;

            .card-cvv {
                color: ${(props) => props.theme.colors.defaultDarkGrey};
                font-weight: 500;
            }
        }

        .paperbook-logo {
            position: absolute;
            left: 20px;
            bottom: 20px;
        }
    }

    &:hover > .front,
    &.turned > .front {
        transform: rotateY(180deg);
    }

    &:hover > .back,
    &.turned > .back {
        transform: rotateY(0deg);
    }
`;

export const CheckOrder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    padding-top: 10%;

    h1 {
        color: ${(props) => props.theme.colors.defaultLightGreen};
        font-size: 1.8rem;
        font-weight: 500;

        margin-bottom: 30px;
    }
`;
