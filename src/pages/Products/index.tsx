import React, { useState } from 'react';

import { CreateProductPayload } from '../../models/payloads/category/createProduct';
import { ProductProxy } from '../../models/proxies/product/product';

import api from '../../services/api';

import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';

import TextField from '../../components/molecules/TextField';

import { Container } from './styles';

const Products: React.FC = () => {
    const { me } = useUser();
    7;
    const { token } = useAuth();

    const [nameText, setNameText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [fullPriceText, setFullPriceText] = useState('');
    const [installmentPriceText, setInstallmentPriceText] = useState('');
    const [installmentAmountText, setInstallmentAmountText] = useState('');
    const [discountAmountText, setDiscountAmountText] = useState('');
    const [stockAmountText, setStockAmountText] = useState('');

    const createProduct = async (): Promise<void> => {
        if (me) {
            const product: CreateProductPayload = {
                name: nameText,
                description: descriptionText,
                price: parseFloat(fullPriceText.replace(/,/, '.')),
                installmentPrice:
                    installmentPriceText.length > 0
                        ? parseFloat(installmentPriceText.replace(/,/, '.'))
                        : undefined,
                installmentAmount:
                    installmentAmountText.length > 0
                        ? parseFloat(installmentAmountText)
                        : undefined,
                discount:
                    discountAmountText.length > 0
                        ? parseFloat(discountAmountText.replace(/,/, '.'))
                        : undefined,
                stockAmount: parseFloat(stockAmountText),
                userId: me.id
            };

            console.log(product);

            try {
                console.log(token);

                const response = await api.post<ProductProxy>(
                    '/products',
                    product,
                    {
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Container>
            <TextField
                label="Nome"
                name="nameInput"
                onTextChange={setNameText}
                type="text"
            />
            <TextField
                label="Descrição"
                name="descriptionInput"
                onTextChange={setDescriptionText}
                type="text"
            />
            <TextField
                label="Preço"
                name="priceInput"
                onTextChange={setFullPriceText}
                type="text"
            />
            <TextField
                label="Preço parcelado"
                name="installmentPriceInput"
                onTextChange={setInstallmentPriceText}
                type="text"
            />
            <TextField
                label="Quantidade de parcelas"
                name="installmentAmountInput"
                onTextChange={setInstallmentAmountText}
                type="text"
            />
            <TextField
                label="Desconto"
                name="discountAmountInput"
                onTextChange={setDiscountAmountText}
                type="text"
            />
            <TextField
                label="Quantidade em estoque"
                name="stockAmountInput"
                onTextChange={setStockAmountText}
                type="text"
            />
            <button onClick={createProduct}>Create Product</button>
        </Container>
    );
};

export default Products;
