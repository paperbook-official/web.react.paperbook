import React from 'react';

import { useTheme } from 'styled-components';

import { ReactComponent as CartIcon } from '../../../assets/icons/shopping-cart.svg';

import { CartCounter, Container } from './styles';

interface CartProps {
    cartAmount: number;
}

const Cart: React.FC<CartProps> = ({
    cartAmount = 0
}: CartProps): JSX.Element => {
    const iconSize = 30;

    const theme = useTheme();

    return (
        <Container theme={theme}>
            <CartIcon width={`${iconSize}px`} height={`${iconSize}px`} />
            {cartAmount > 0 ? <CartCounter>{cartAmount}</CartCounter> : <></>}
        </Container>
    );
};

export default Cart;
