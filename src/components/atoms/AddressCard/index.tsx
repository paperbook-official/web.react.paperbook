import React from 'react';

import { AddressProxy } from '../../../models/proxies/address/address';
import { UserProxy } from '../../../models/proxies/user/user';

import { useTheme } from 'styled-components';

import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';

import { Container, ChangeAddressButton } from './styles';

interface AddressCardProps {
    user: UserProxy;
    address: AddressProxy;
    onAddressChangeClick(user: UserProxy, address: AddressProxy): void;
}

const AddressCard: React.FC<AddressCardProps> = ({
    user,
    address,
    onAddressChangeClick
}: AddressCardProps): JSX.Element => {
    const theme = useTheme();

    return (
        <Container>
            <div className="delete-button">
                <CloseIcon
                    height="22"
                    width="22"
                    color={theme.colors.defaultDarkGrey}
                />
            </div>
            <span className="username">{user.name}</span>
            <span>{`${address.street}, ${address.houseNumber}`}</span>
            <span>{address.district}</span>
            <span>{`${address.city} - ${address.state}`}</span>
            <span>CEP {address.cep}</span>
            <div className="change-address-container">
                <ChangeAddressButton
                    onClick={() => onAddressChangeClick(user, address)}
                >
                    Alterar endereco de entrega
                </ChangeAddressButton>
            </div>
        </Container>
    );
};

export default AddressCard;
