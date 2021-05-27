import React, { useEffect, useState } from 'react';
import Select, { components } from 'react-select';

import { ActionResultEnum } from '../../../models/enums/actionResultTypes';
import { CreateProductPayload } from '../../../models/payloads/products/createProduct';
import { UpdateProductPayload } from '../../../models/payloads/products/updateProduct';
import { CategoryProxy } from '../../../models/proxies/category/category';
import { ProductProxy } from '../../../models/proxies/product/product';

import { useActionResult } from '../../../hooks/useActionResult';
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

interface ProductCreationProps {
    onComplete(product: ProductProxy): void;
    product?: ProductProxy;
}

const ProductCreation: React.FC<ProductCreationProps> = ({
    onComplete,
    product
}: ProductCreationProps): JSX.Element => {
    const { me } = useUser();
    const { createProduct, updateProduct } = useProduct();
    const { show } = useActionResult();
    const { uploadImage } = useProduct();
    const { getCategories } = useCategory();

    const [isFormLoading, setFormLoading] = useState(false);
    const [isCategoriesLoading, setCategoriesLoading] = useState(false);
    const [categories, setCategories] = useState<SelectProps[]>([]);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const [productImage, setProductImage] = useState('');
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

        if (product) {
            const prodCategories = product.categories?.filter((cat) =>
                data.find((c) => cat.id === c.value.id)
            );

            setCategoriesList(prodCategories || []);
        }

        setCategoriesLoading(false);
    };

    useEffect(() => {
        if (product) {
            setProductImage(product.imageUrl);
            setNameText(product.name);
            setDescriptionText(product.description);
            setFullPriceText(product.price.toString());
            setInstallmentPriceText(product.installmentPrice?.toString() || '');
            setInstallmentAmountText(
                product.installmentAmount?.toString() || ''
            );
            setDiscountAmountText(
                product.discount ? (product.discount * 100).toString() : ''
            );
            setStockAmountText(product.stockAmount.toString());

            setNameValid(true);
            setDescriptionValid(true);
            setFullPriceValid(true);
            setInstallmentPriceValid(true);
            setInstallmentAmountValid(true);
            setDiscountAmountValid(true);
            setStockAmountValid(true);
        }

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
            (!!image || !!productImage) &&
            categoriesList.length > 0
        );
    };

    const handleCreateClick = async (): Promise<void> => {
        if (me && (image || productImage) && isFormValid()) {
            setFormLoading(true);
            let imageUrl = productImage || '';

            if (image) {
                try {
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
            }

            if (imageUrl) {
                const productPayload: UpdateProductPayload = {
                    imageUrl,
                    name: nameText.trim(),
                    description: descriptionText.trim(),
                    price: parseFloat(fullPriceText.trim().replace(/,/g, '.')),
                    installmentPrice:
                        installmentPriceText.trim().length > 0 &&
                        parseFloat(
                            installmentPriceText.trim().replace(/,/g, '.')
                        ) > parseFloat(fullPriceText.trim().replace(/,/g, '.'))
                            ? parseFloat(
                                  installmentPriceText.trim().replace(/,/g, '.')
                              )
                            : undefined,
                    installmentAmount:
                        installmentAmountText.trim().length > 0
                            ? parseFloat(installmentAmountText.trim())
                            : undefined,
                    discount:
                        discountAmountText.trim().length > 0
                            ? parseFloat(
                                  discountAmountText.trim().replace(/,/g, '.')
                              ) / 100
                            : undefined,
                    stockAmount: parseInt(stockAmountText.trim()),
                    categoryIds: categoriesList.map((c) => c.id)
                };

                try {
                    const discountValue =
                        discountAmountText.trim().length > 0
                            ? parseFloat(
                                  discountAmountText.trim().replace(/,/g, '.')
                              ) / 100
                            : 0;

                    if (product) {
                        await updateProduct(productPayload, product.id);

                        onComplete({
                            ...productPayload,
                            id: product.id,
                            categories: categoriesList,
                            discount: discountValue
                        } as ProductProxy);

                        show(
                            'Produto atualizado',
                            productPayload.name || '',
                            ActionResultEnum.SUCCESS
                        );
                    } else {
                        const response = await createProduct({
                            ...productPayload,
                            userId: me.id
                        } as CreateProductPayload);

                        onComplete({
                            ...productPayload,
                            id: response.id,
                            categories: categoriesList,
                            discount: discountValue
                        } as ProductProxy);

                        show(
                            'Produto criado',
                            response.name,
                            ActionResultEnum.SUCCESS
                        );
                    }
                } catch (error) {
                    show(
                        `Erro ao ${product ? 'atualizar' : 'criar'} o produto`,
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
    const ValueContainer = (props: any): JSX.Element => (
        <components.ValueContainer
            {...props}
            className={`category-selector-control ${
                !categoriesList[0] ? 'empty' : ''
            }`}
        >
            {categoriesList[0]?.name || 'Selecionar'}{' '}
            {categoriesList.length > 1 && (
                <span className="rest"> +{categoriesList.length - 1}</span>
            )}
        </components.ValueContainer>
    );

    const getSelectDefaultValue = (): SelectProps[] => {
        const list = categoriesList.map((c) => c.id);
        return categories.filter((cat) => list.includes(cat.value.id));
    };

    window.onclick = (event: MouseEvent): void => {
        const target = event.target as HTMLElement;

        const containsClass = (className: string): boolean => {
            return target.classList.contains(className);
        };

        const classes = [
            'category-selector',
            'category-selector-control',
            'selector__control',
            'selector__indicator',
            'selector__indicators',
            'selector__indicator-separator'
        ];

        if (classes.some((c) => containsClass(c)) && !isMenuOpen) {
            setMenuOpen(true);
        }
        if (
            !containsClass('selector__menu') &&
            !containsClass('selector__option') &&
            isMenuOpen
        ) {
            setMenuOpen(false);
        }
    };

    return (
        <Container>
            <div className="field-row" style={{ height: 220 }}>
                <ImagePickerContainer>
                    <ImagePicker
                        onImagePick={setImage}
                        imageUrl={productImage}
                    />
                </ImagePickerContainer>
                <FieldsContainer style={{ width: '47%' }}>
                    <div className="field-row">
                        <TextField
                            value={fullPriceText}
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
                            value={installmentPriceText}
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
                            value={discountAmountText}
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
            <FieldsContainer>
                <div className="field-row">
                    <TextField
                        value={nameText}
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
                        value={descriptionText}
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
                        value={installmentAmountText}
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
                        value={stockAmountText}
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
                {!isCategoriesLoading &&
                    (product ? categoriesList.length > 0 : true) &&
                    categories.length > 0 && (
                        <div className="field-row">
                            <Select
                                isLoading={isCategoriesLoading}
                                closeMenuOnSelect={false}
                                isMulti
                                name="categories"
                                defaultValue={[...getSelectDefaultValue()]}
                                options={categories}
                                placeholder=""
                                className="category-selector"
                                classNamePrefix="selector"
                                menuPlacement="top"
                                backspaceRemovesValue
                                controlShouldRenderValue={false}
                                components={{
                                    ValueContainer
                                }}
                                onChange={onCategorySelect}
                                menuIsOpen={isMenuOpen}
                            />
                        </div>
                    )}
                {isCategoriesLoading && (
                    <div
                        className="field-row"
                        style={{ justifyContent: 'center' }}
                    >
                        <LoadingDots />
                    </div>
                )}
            </FieldsContainer>
            {isFormLoading ? (
                <LoadingDots />
            ) : (
                <CreateButton
                    disabled={!isFormValid()}
                    className={!isFormValid() ? 'disabled' : ''}
                    onClick={handleCreateClick}
                >
                    {product ? 'Atualizar' : 'Criar'}
                </CreateButton>
            )}
        </Container>
    );
};

export default ProductCreation;
