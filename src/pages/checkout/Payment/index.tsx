import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { ActionResultEnum } from '../../../models/enums/actionResultTypes';
import { OrderStatus } from '../../../models/enums/order';
import { CreateOrderPayload } from '../../../models/payloads/order/createOrder';

import { useActionResult } from '../../../hooks/useActionResult';
import { useCart } from '../../../hooks/useCart';
import { useOrder } from '../../../hooks/useOrder';
import { useShipping } from '../../../hooks/useShipping';
import { useUser } from '../../../hooks/useUser';

import LoadingDots from '../../../components/atoms/LoadingDots';
import Logo from '../../../components/atoms/Logo';
import Selector from '../../../components/atoms/Selector';
import TextField from '../../../components/molecules/TextField';
import Header from '../../../components/organisms/Header';
import { useTheme } from 'styled-components';

import {
    xFilledString,
    maskString,
    formatPrice
} from '../../../utils/formatters';

import { ReactComponent as CheckIcon } from '../../../assets/icons/check.svg';
import { ReactComponent as ChipIcon } from '../../../assets/icons/electronic-chip.svg';
import { ReactComponent as WorldIcon } from '../../../assets/icons/world.svg';

import {
    CheckOrder,
    Container,
    Content,
    Title,
    PaymentContainer,
    FieldsContainer,
    CreditCardContainer,
    CreditCard,
    Button
} from './styles';

const cardNumberRegex = /^[1-9][0-9]{15}$/;
const cardHolderRegex = /^([a-zA-Z]+ ?){1,}$/;
const expirationDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
const cvvRegex = /^[0-9]{3}$/;

const Payment: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const history = useHistory();
    const { me, selectedAddress } = useUser();
    const { localCart, deleteLocalCart } = useCart();
    const { option } = useShipping();
    const { createOrder } = useOrder();
    const { show } = useActionResult();

    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isCreditCardTurned, setCreditCardTurned] = useState(false);
    const [isLoadingData, setLoadingData] = useState(false);

    const [installments, setInstallments] = useState<string[]>([]);
    const [selectedInstallment, setSelectedInstallment] = useState(0);

    const [checkOrder, setCheckOrder] = useState(false);
    const [checkWidth, setCheckWidth] = useState(0);

    const initialState = async (): Promise<void> => {
        setLoadingData(true);

        if (localCart && option) {
            let isInterestFree = true;

            const firstInstPrice = localCart
                .map(
                    (cartStorage) =>
                        cartStorage.product.price *
                        (1 - cartStorage.product.discount) *
                        cartStorage.amount
                )
                .reduce((previous, current) => previous + current, 0);

            const instPrice = localCart
                .map((cartStorage) => {
                    if (
                        cartStorage.product.installmentPrice &&
                        cartStorage.product.installmentPrice >
                            cartStorage.product.price
                    ) {
                        isInterestFree = false;
                        return (
                            cartStorage.product.installmentPrice *
                            (1 - cartStorage.product.discount) *
                            cartStorage.amount
                        );
                    } else {
                        return (
                            cartStorage.product.price *
                            (1 - cartStorage.product.discount) *
                            cartStorage.amount
                        );
                    }
                })
                .reduce((previous, current) => previous + current, 0);

            const instAmount = Math.min(
                ...localCart.map(
                    (cartStorage) => cartStorage.product.installmentAmount
                )
            );

            const insts: string[] = [
                `1x R$ ${formatPrice(firstInstPrice + option.price)}`
            ];

            for (let i = 2; i <= instAmount; i++) {
                insts.push(
                    `${i}x R$ ${formatPrice((instPrice + option.price) / i)} ${
                        isInterestFree ? 'sem juros' : ''
                    }`.trim()
                );
            }

            setInstallments(insts);
        }

        setLoadingData(false);
    };

    useEffect(() => {
        if (!me || !selectedAddress || !localCart) {
            history.push('/cart');
        }
        initialState();
    }, []);

    useEffect(() => {
        if (checkOrder) {
            setCheckWidth(1);
        }
    }, [checkOrder]);

    const getCardNumberMask = (): string | undefined => {
        const len = cardNumber.length;

        if (len < 5) {
            return '####';
        } else if (len < 9) {
            return '#### ####';
        } else if (len < 13) {
            return '#### #### ####';
        } else if (len === 13) {
            return '### ### ### ####';
        } else if (len === 14) {
            return '### ### #### ####';
        } else if (len === 15) {
            return '### #### #### ####';
        } else {
            return '#### #### #### ####';
        }
    };

    const getExpirationDateMask = (): string | undefined => {
        const len = expirationDate.length;

        if (len < 3) {
            return '##';
        } else {
            return '##/##';
        }
    };

    const isFormValid = (): boolean => {
        return (
            cardNumberRegex.test(cardNumber) &&
            cardHolderRegex.test(cardHolder) &&
            expirationDateRegex.test(expirationDate) &&
            cvvRegex.test(cvv)
        );
    };

    const getTrackingCode = (): string => {
        return 'xxxxxxxxxxxxx'.replace(/[x]/g, (c: string) => {
            const r = (Math.random() * 16) | 0;
            const v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16).toUpperCase();
        });
    };

    const handleFinishClick = async (): Promise<void> => {
        if (me && selectedAddress && localCart) {
            const orders: CreateOrderPayload[] = [];
            localCart.forEach((cartStorage) => {
                const product = cartStorage.product;
                const order = {
                    userId: me.id,
                    productId: product.id,
                    addressId: selectedAddress,
                    amount: cartStorage.amount,
                    trackingCode: getTrackingCode(),
                    status: OrderStatus.PENDING,
                    installmentAmount: selectedInstallment + 1,
                    totalPrice:
                        product.installmentPrice &&
                        product.installmentPrice > product.price &&
                        selectedInstallment > 0
                            ? product.installmentPrice *
                              (1 - product.discount) *
                              cartStorage.amount
                            : product.price *
                              (1 - product.discount) *
                              cartStorage.amount
                };
                orders.push(order);
            });
            try {
                const promises = orders.map(
                    async (order) => await createOrder(order)
                );

                await Promise.all(promises);

                deleteLocalCart();
                setCheckOrder(true);
            } catch (error) {
                show(
                    'Confirmação do pedido',
                    error.response.data.statusCode +
                        ': erro ao finalizar o pedido',
                    ActionResultEnum.ERROR
                );
            }
        }
    };

    return (
        <Container>
            {!checkOrder && <Header isSecondary />}
            {!checkOrder && (
                <Content>
                    <Title>Pagamento do pedido</Title>
                    <div className="divider"></div>
                    {isLoadingData ? (
                        <div className="loading-container">
                            <LoadingDots />
                        </div>
                    ) : (
                        <PaymentContainer>
                            <FieldsContainer>
                                <h3>Dados bancários</h3>
                                <div className="row-container">
                                    <TextField
                                        value={cardNumber}
                                        label="Número do cartão"
                                        name="cardNumber"
                                        onTextChange={(cardNum: string) =>
                                            setCardNumber(
                                                cardNum.replace(/\s/g, '')
                                            )
                                        }
                                        type="text"
                                        mask={getCardNumberMask()}
                                        errorMessage="Número do cartão inválido"
                                        validation={(cardNumber: string) =>
                                            cardNumberRegex.test(
                                                cardNumber.replace(/\s/g, '')
                                            )
                                        }
                                        length={19}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div className="row-container">
                                    <TextField
                                        label="Nome no cartão"
                                        name="cardHolder"
                                        onTextChange={(cardHolder: string) =>
                                            setCardHolder(cardHolder)
                                        }
                                        type="text"
                                        errorMessage="Nome inválido"
                                        validation={(cardHolder: string) =>
                                            cardHolderRegex.test(cardHolder)
                                        }
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div className="row-container">
                                    <TextField
                                        value={expirationDate}
                                        label="Validade"
                                        name="expirationDate"
                                        onTextChange={(
                                            expirationDate: string
                                        ) => setExpirationDate(expirationDate)}
                                        type="text"
                                        mask={getExpirationDateMask()}
                                        errorMessage="Validade inválido"
                                        validation={(expDate: string) =>
                                            expirationDateRegex.test(expDate)
                                        }
                                        length={5}
                                        style={{ width: '47%' }}
                                    />
                                    <TextField
                                        label="CVV"
                                        name="cvv"
                                        onTextChange={(cvv: string) =>
                                            setCvv(cvv)
                                        }
                                        onInputFocus={() =>
                                            setCreditCardTurned(true)
                                        }
                                        onInputBlur={() =>
                                            setCreditCardTurned(false)
                                        }
                                        type="text"
                                        errorMessage="CVV inválido"
                                        validation={(cvv: string) =>
                                            cvvRegex.test(cvv)
                                        }
                                        length={3}
                                        style={{ width: '47%' }}
                                    />
                                </div>
                                {installments && (
                                    <Selector
                                        style={{ alignSelf: 'center' }}
                                        items={installments}
                                        onSelect={setSelectedInstallment}
                                    />
                                )}
                                <div className="button-container">
                                    <Button
                                        className={
                                            !isFormValid() ? 'disabled' : ''
                                        }
                                        disabled={!isFormValid()}
                                        onClick={handleFinishClick}
                                    >
                                        Finalizar
                                    </Button>
                                    <Button
                                        className="secondary"
                                        onClick={() =>
                                            history.push('/identification')
                                        }
                                    >
                                        Voltar
                                    </Button>
                                </div>
                            </FieldsContainer>
                            <div className="vertical-divider"></div>
                            <CreditCardContainer>
                                <CreditCard
                                    className={
                                        isCreditCardTurned ? 'turned' : ''
                                    }
                                >
                                    <div className="credit-card front">
                                        <WorldIcon
                                            height="180"
                                            width="300"
                                            color="#0003"
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform:
                                                    'translate(-50%, -50%)',
                                                zIndex: -1
                                            }}
                                        />
                                        <div className="paperbook-logo">
                                            <Logo showTitle={false} size={34} />
                                        </div>
                                        <ChipIcon
                                            color="#ededed"
                                            height="30"
                                            width="30"
                                        />
                                        <span className="card-number">
                                            {maskString(
                                                xFilledString(cardNumber, 16),
                                                '#### #### #### ####'
                                            )}
                                        </span>
                                        <span className="card-holder">
                                            {cardHolder.toUpperCase()}
                                        </span>
                                        <span className="expiration-date">
                                            <span className="exp-string">
                                                Validade
                                            </span>
                                            <div className="exp-container">
                                                <span className="exp-month">
                                                    {xFilledString(
                                                        expirationDate.substr(
                                                            0,
                                                            2
                                                        ),
                                                        2
                                                    )}
                                                </span>
                                                /
                                                <span className="exp-year">
                                                    {expirationDate.includes(
                                                        '/'
                                                    )
                                                        ? xFilledString(
                                                              expirationDate.substr(
                                                                  3,
                                                                  2
                                                              ),
                                                              2
                                                          )
                                                        : xFilledString(
                                                              expirationDate.substr(
                                                                  2,
                                                                  2
                                                              ),
                                                              2
                                                          )}
                                                </span>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="credit-card back">
                                        <WorldIcon
                                            height="180"
                                            width="300"
                                            color="#0003"
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform:
                                                    'translate(-50%, -50%)',
                                                zIndex: -1
                                            }}
                                        />
                                        <div className="card-black-bar"></div>
                                        <div className="card-secret-container">
                                            <div className="card-secret-bar"></div>
                                            <div className="card-secret">
                                                <span className="card-cvv">
                                                    {xFilledString(cvv, 3)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="paperbook-logo">
                                            <Logo showTitle={false} size={34} />
                                        </div>
                                    </div>
                                </CreditCard>
                            </CreditCardContainer>
                        </PaymentContainer>
                    )}
                </Content>
            )}
            {checkOrder && (
                <CheckOrder>
                    <CheckIcon
                        height="100"
                        width="100"
                        color={theme.colors.defaultLightGreen}
                        style={{
                            transform: `scale(${checkWidth})`,
                            transition:
                                'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                    />
                    <h1>Seu pagamento foi efetuado!</h1>
                    <Button
                        className="check-order"
                        onClick={() => history.push('/')}
                    >
                        Voltar à tela inicial
                    </Button>
                </CheckOrder>
            )}
        </Container>
    );
};

export default Payment;
