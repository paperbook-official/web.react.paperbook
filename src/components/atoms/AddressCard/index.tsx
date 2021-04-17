import React from 'react';

import { AddressProxy } from '../../../models/proxies/address/address';
import { UserProxy } from '../../../models/proxies/user/user';

import { useTheme } from 'styled-components';

import { maskString } from '../../../utils/formatters';

import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';

import { Container } from './styles';

interface AddressCardProps {
    user: UserProxy;
    address: AddressProxy;
    onUseAddressClick(address: AddressProxy): void;
    onDeleteClick(address: AddressProxy): void;
}

const AddressCard: React.FC<AddressCardProps> = ({
    user,
    address,
    onUseAddressClick,
    onDeleteClick
}: AddressCardProps): JSX.Element => {
    const theme = useTheme();

    const handleContainerClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const id = (event.target as HTMLElement).id;

        if (id === 'container-part') {
            onUseAddressClick(address);
        } else {
            onDeleteClick(address);
        }
    };

    return (
        <Container
            id="container-part"
            onClick={(event) => handleContainerClick(event)}
        >
            <div className="delete-button">
                <CloseIcon
                    height="22"
                    width="22"
                    color={theme.colors.defaultDarkGrey}
                />
            </div>
            <span id="container-part" className="username">
                {user.name}
            </span>
            <span id="container-part">{`${address.street}, ${address.houseNumber}`}</span>
            <span id="container-part">{address.district}</span>
            <span id="container-part">{`${address.city} - ${address.state}`}</span>
            <span id="container-part">
                CEP {maskString(address.cep, '#####-###')}
            </span>
        </Container>
    );
};

export default AddressCard;
