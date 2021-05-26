import React, { useEffect, useState } from 'react';
import Select, { components } from 'react-select';

import { ActionResultEnum } from '../../../models/enums/actionResultTypes';
import { CreateProductPayload } from '../../../models/payloads/products/createProduct';
import { CategoryProxy } from '../../../models/proxies/category/category';
import { ProductProxy } from '../../../models/proxies/product/product';

import api from '../../../services/api';

import { useActionResult } from '../../../hooks/useActionResult';
import { useAuth } from '../../../hooks/useAuth';
import { useCategory } from '../../../hooks/useCategory';
import { useProduct } from '../../../hooks/useProduct';
import { useUser } from '../../../hooks/useUser';

import {
    percentageValidation,
    priceValidation
} from '../../../utils/validations';

import ImagePicker from '../../atoms/ImagePicker';
import LoadingDots from '../../atoms/LoadingDots';
import TextField from '../../molecules/TextField';
import {
    Container,
    CreateButton,
    FieldsContainer,
    ImagePickerContainer
} from './styles';

interface SelectProps {
    value: CategoryProxy;
    label: string;
}

const ProductCreation: React.FC = () => {
    const { me } = useUser();
    const { token } = useAuth();
    const { show } = useActionResult();
    const { uploadImage } = useProduct();
    const { getCategories } = useCategory();

    const [isFormLoading, setFormLoading] = useState(false);
    const [isCategoriesLoading, setCategoriesLoading] = useState(false);
    const [categories, setCategories] = useState<SelectProps[]>([]);

    const [image, setImage] = useState<File>();
    const [nameText, setNameText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [fullPriceText, setFullPriceText] = useState('');
    const [installmentPriceText, setInstallmentPriceText] = useState('');
    const [installmentAmountText, setInstallmentAmountText] = useState('');
    const [discountAmountText, setDiscountAmountText] = useState('');
    const [stockAmountText, setStockAmountText] = useState('');
    const [categoriesList, setCategoriesList] = useState<CategoryProxy[]>([]);

    const [isNameValid, setNameValid] = useState(false);
    const [isDescriptionValid, setDescriptionValid] = useState(false);
    const [isFullPriceValid, setFullPriceValid] = useState(false);
    const [isInstallmentPriceValid, setInstallmentPriceValid] = useState(false);
    const [isInstallmentAmountValid, setInstallmentAmountValid] = useState(
        false
    );
    const [isDiscountAmountValid, setDiscountAmountValid] = useState(false);
    const [isStockAmountValid, setStockAmountValid] = useState(false);

    const initialState = async (): Promise<void> => {
        setCategoriesLoading(true);

        const response = await getCategories();
        const data: SelectProps[] = [];

        const promises = response.map((category) => {
            data.push({ value: category, label: category.name });
        });

        await Promise.all(promises);
        setCategories(data);

        setCategoriesLoading(false);
    };

    useEffect(() => {
        initialState();
    }, []);

    const isFormValid = (): boolean => {
        return (
            isNameValid &&
            isDescriptionValid &&
            isFullPriceValid &&
            isInstallmentPriceValid &&
            isInstallmentAmountValid &&
            isDiscountAmountValid &&
            isStockAmountValid &&
            !!image &&
            categoriesList.length > 0
        );
    };

    const createProduct = async (): Promise<void> => {
        if (me && image && isFormValid()) {
            setFormLoading(true);
            let imageUrl = '';
            try {
                console.log(image);
                const response = await uploadImage(image);
                imageUrl = response.url;
            } catch (error) {
                console.log(error);
                show(
                    'Erro ao enviar a imagem',
                    'Ocorreu um erro ao enviar a imagem!',
                    ActionResultEnum.ERROR
                );
            }

            if (imageUrl) {
                const product: CreateProductPayload = {
                    imageUrl,
                    name: nameText.trim(),
                    description: descriptionText.trim(),
                    price: parseFloat(fullPriceText.trim().replace(/,/, '.')),
                    installmentPrice:
                        installmentPriceText.trim().length > 0 &&
                        parseFloat(
                            installmentPriceText.trim().replace(/,/, '.')
                        ) > parseFloat(fullPriceText.trim().replace(/,/, '.'))
                            ? parseFloat(
                                  installmentPriceText.trim().replace(/,/, '.')
                              )
                            : undefined,
                    installmentAmount:
                        installmentAmountText.trim().length > 0
                            ? parseFloat(installmentAmountText.trim())
                            : undefined,
                    discount:
                        discountAmountText.trim().length > 0
                            ? parseFloat(
                                  discountAmountText.trim().replace(/,/, '.')
                              ) / 100
                            : undefined,
                    stockAmount: parseInt(stockAmountText.trim()),
                    userId: me.id,
                    categoryIds: categoriesList.map((c) => c.id)
                };

                console.log(product);

                try {
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
                    show(
                        'Erro ao criar produto',
                        'Ocorreu um erro ao enviar o produto!',
                        ActionResultEnum.ERROR
                    );
                }
            }

            setFormLoading(false);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onCategorySelect = (data: any): void => {
        setCategoriesList(data.map((category: SelectProps) => category.value));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Input = (props: any): JSX.Element => (
        <components.Control
            {...props}
            className={`category-selector-control ${
                !categoriesList[0] ? 'empty' : ''
            }`}
        >
            {categoriesList[0]?.name || 'Selecionar'}{' '}
            {categoriesList.length > 1 && (
                <span className="rest"> +{categoriesList.length - 1}</span>
            )}
        </components.Control>
    );

    return (
        <Container>
            <div className="field-row" style={{ height: 220 }}>
                <ImagePickerContainer>
                    <ImagePicker onImagePick={setImage} />
                </ImagePickerContainer>
                <FieldsContainer style={{ width: '47%' }}>
                    <div className="field-row">
                        <TextField
                            label="Preço"
                            name="priceInput"
                            onTextChange={setFullPriceText}
                            validation={(text) =>
                                priceValidation(text.replace(/\./g, ',')) &&
                                parseFloat(text.replace(',', '.')) >= 1
                            }
                            isValid={setFullPriceValid}
                            errorMessage="Preço inválido!"
                            type="text"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div className="field-row">
                        <TextField
                            label="Preço parcelado"
                            name="installmentPriceInput"
                            onTextChange={setInstallmentPriceText}
                            validation={(text) =>
                                text.length === 0 ||
                                (priceValidation(text.replace(/\./g, ',')) &&
                                    parseFloat(text.replace(',', '.')) >= 1)
                            }
                            isValid={setInstallmentPriceValid}
                            errorMessage="Preço inválido!"
                            type="text"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div className="field-row">
                        <TextField
                            label="Desconto em %"
                            name="discountAmountInput"
                            onTextChange={setDiscountAmountText}
                            validation={(text) =>
                                text.length === 0 ||
                                percentageValidation(text.replace(/\./g, ','))
                            }
                            isValid={setDiscountAmountValid}
                            errorMessage="Desconto inválido!"
                            length={3}
                            type="text"
                            style={{ width: '100%' }}
                        />
                    </div>
                </FieldsContainer>
            </div>
            <FieldsContainer style={{ marginTop: -10 }}>
                <div className="field-row">
                    <TextField
                        label="Nome"
                        name="nameInput"
                        onTextChange={setNameText}
                        validation={(text) => text.length >= 5}
                        isValid={setNameValid}
                        errorMessage="Mínimo de 5 caracteres!"
                        type="text"
                        style={{ width: '100%' }}
                    />
                </div>
                <div className="field-row">
                    <TextField
                        label="Descrição"
                        name="descriptionInput"
                        onTextChange={setDescriptionText}
                        validation={(text) => text.length >= 10}
                        isValid={setDescriptionValid}
                        errorMessage="Mínimo de 10 caracteres!"
                        type="text"
                        style={{ width: '100%' }}
                    />
                </div>
                <div className="field-row">
                    <TextField
                        label="Quantidade de parcelas"
                        name="installmentAmountInput"
                        onTextChange={setInstallmentAmountText}
                        validation={(text) =>
                            text.length === 0 ||
                            (/^[0-9]{0,2}$/g.test(text) && parseInt(text) <= 12)
                        }
                        isValid={setInstallmentAmountValid}
                        errorMessage="Valor entre 0 e 12!"
                        length={2}
                        type="text"
                        style={{ width: '47%' }}
                    />
                    <TextField
                        label="Quantidade em estoque"
                        name="stockAmountInput"
                        onTextChange={setStockAmountText}
                        validation={(text) =>
                            /^(?:[1-9][0-9]{0,4})$|^100000$/.test(text)
                        }
                        isValid={setStockAmountValid}
                        errorMessage="Quantidade inválida!"
                        length={6}
                        type="text"
                        style={{ width: '47%' }}
                    />
                </div>
                <div className="field-row">
                    <Select
                        isLoading={isCategoriesLoading}
                        closeMenuOnSelect={false}
                        isMulti
                        name="categories"
                        options={categories}
                        placeholder=""
                        className="category-selector"
                        menuPlacement="auto"
                        backspaceRemovesValue
                        controlShouldRenderValue={false}
                        components={{
                            Input
                        }}
                        onChange={onCategorySelect}
                    />
                </div>
            </FieldsContainer>
            {isFormLoading ? (
                <LoadingDots />
            ) : (
                <CreateButton
                    disabled={!isFormValid()}
                    className={!isFormValid() ? 'disabled' : ''}
                    onClick={createProduct}
                >
                    Criar
                </CreateButton>
            )}
        </Container>
    );
};

export default ProductCreation;
