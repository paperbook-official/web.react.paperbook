import React, { useState } from 'react';

import { AddressProxy } from '../../../models/proxies/address';

import icon from '../../../assets/icons/close.svg';

import ShippingCard from '../../organisms/ShippingCard';
import Modal from '../Modal';
import { CardContainer } from './styles';

// interface AddressCardProps {
//     address: AddressProxy;
//     onAddressChangeClick(address: AddressProxy): void;
// }

const AddressCard: React.FC = (): JSX.Element => {
    const [modalActive, setModalActive] = useState(false);

    function handleAddressChange() {
        setModalActive(true);
        console.log('helloasdaf');
    }

    return (
        <CardContainer>
            <p className="username">
                Erick
                <button className="delete_button">
                    <img src={icon} />
                </button>
            </p>
            <p>Rua do Erick, 100</p>
            <p>Bairro do Erick</p>
            <p>SP - Tiete</p>
            <p>CEP 190000</p>
            <a onClick={() => handleAddressChange()}>
                Alterar endereco de entrega
            </a>
            {modalActive && (
                <Modal>
                    <p>aqui vai o shipping card</p>
                </Modal>
            )}
        </CardContainer>
    );
};

export default AddressCard;
