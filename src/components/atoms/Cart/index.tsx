import React, { useState } from 'react';

import { useTheme } from 'styled-components';

import { ReactComponent as CartIcon } from '../../../assets/icons/shopping-cart.svg';

import { CartCounter, Container } from './styles';

interface CartProps {
    cartAmount: number;
}

const Cart: React.FC<CartProps> = ({
    cartAmount = 0
}: CartProps): JSX.Element => {
    const theme = useTheme();

    const [iconColor, setIconColor] = useState(theme.colors.background);

    const iconSize = 30;

    return (
        <Container
            theme={theme}
            onMouseEnter={() => setIconColor(theme.colors.defaultGrey)}
            onMouseLeave={() => setIconColor(theme.colors.background)}
        >
            <CartIcon
                color={iconColor}
                style={{ transition: 'all 0.2s' }}
                width={`${iconSize}px`}
                height={`${iconSize}px`}
            />
            {cartAmount > 0 ? <CartCounter>{cartAmount}</CartCounter> : <></>}
        </Container>
    );
};

export default Cart;
