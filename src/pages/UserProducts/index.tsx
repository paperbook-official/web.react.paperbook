import React, { useState } from 'react';

import FloatButton from '../../components/atoms/FloatButton';
import Modal from '../../components/atoms/Modal';
import Header from '../../components/organisms/Header';
import ProductCreation from '../../components/organisms/ProductCreation';

import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';

import { Container } from './styles';

const UserProducts: React.FC = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <Container>
            <Header />
            <FloatButton
                Icon={PlusIcon}
                onClick={() => setModalVisible(true)}
                text="Adicionar produto"
                iconSize={30}
            />
            {isModalVisible && (
                <Modal onClickOutside={() => setModalVisible(false)}>
                    <ProductCreation />
                </Modal>
            )}
        </Container>
    );
};

export default UserProducts;
