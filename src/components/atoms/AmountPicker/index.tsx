import React, { useEffect, useState } from 'react';

import { useTheme } from 'styled-components';

import { ReactComponent as CaretArrowIcon } from '../../../assets/icons/caret-arrow-up.svg';

import {
    AmountInput,
    AmountModsContainer,
    Container,
    InputContainer,
    StockAmount
} from './styles';

interface AmountPickerProps {
    initialAmount?: number;
    onAmountChange(amount: number): void;
    stockAmount: number;
    showOnlyPicker?: boolean;
}

const AmountPicker: React.FC<AmountPickerProps> = ({
    initialAmount = 1,
    onAmountChange,
    stockAmount,
    showOnlyPicker
}: AmountPickerProps) => {
    const theme = useTheme();

    const [amount, setAmount] = useState(1);
    const [arrowUpColor, setArrowUpColor] = useState(
        theme.colors.defaultDarkBlue + (amount < stockAmount ? '' : '77')
    );
    const [arrowDownColor, setArrowDownColor] = useState(
        theme.colors.defaultDarkBlue + (amount > 1 ? '' : '77')
    );

    useEffect(() => {
        setAmount(initialAmount);
    }, []);

    const validateAmount = (value: number): boolean => {
        return !isNaN(value) && value >= 1 && value <= stockAmount;
    };

    const handleAmountChange = (value: string): void => {
        const numberValue = parseInt(value);

        if (validateAmount(numberValue)) {
            setAmount(numberValue);
            onAmountChange(numberValue);

            if (numberValue === 1) {
                setArrowDownColor(theme.colors.defaultDarkBlue + '77');
            } else {
                setArrowDownColor(theme.colors.defaultDarkBlue);
            }

            if (numberValue === stockAmount) {
                setArrowUpColor(theme.colors.defaultDarkBlue + '77');
            } else {
                setArrowUpColor(theme.colors.defaultDarkBlue);
            }
        }
    };

    const caretSize = 13;

    return (
        <Container>
            {showOnlyPicker ? '' : 'Quantidade '}
            <InputContainer>
                <AmountInput
                    value={amount}
                    onChange={(event) => handleAmountChange(event.target.value)}
                />
                <AmountModsContainer>
                    <CaretArrowIcon
                        height={caretSize}
                        width={caretSize}
                        color={arrowUpColor}
                        style={{
                            cursor: amount < stockAmount ? 'pointer' : '',
                            transition: 'all 0.3s'
                        }}
                        onClick={() => handleAmountChange(`${amount + 1}`)}
                        onMouseEnter={() => {
                            if (amount < stockAmount)
                                setArrowUpColor(
                                    theme.colors.defaultHighlightGreyBlue
                                );
                        }}
                        onMouseLeave={() => {
                            if (amount < stockAmount)
                                setArrowUpColor(theme.colors.defaultDarkBlue);
                        }}
                    />
                    <CaretArrowIcon
                        height={caretSize}
                        width={caretSize}
                        color={arrowDownColor}
                        style={{
                            transform: 'rotateZ(180deg)',
                            cursor: amount > 1 ? 'pointer' : '',
                            transition: 'all 0.3s'
                        }}
                        onClick={() => handleAmountChange(`${amount - 1}`)}
                        onMouseEnter={() => {
                            if (amount > 1)
                                setArrowDownColor(
                                    theme.colors.defaultHighlightGreyBlue
                                );
                        }}
                        onMouseLeave={() => {
                            if (amount > 1)
                                setArrowDownColor(theme.colors.defaultDarkBlue);
                        }}
                    />
                </AmountModsContainer>
            </InputContainer>
            {!showOnlyPicker && (
                <StockAmount>
                    <span>{stockAmount}</span>
                    {stockAmount > 1 ? ' disponíveis' : 'disponível'}
                </StockAmount>
            )}
        </Container>
    );
};

export default AmountPicker;
