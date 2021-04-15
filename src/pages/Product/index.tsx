import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { CategoryProxy } from '../../models/proxies/category/category';
import { ProductProxy } from '../../models/proxies/product/product';

import { useLoading } from '../../hooks/useLoading';
import { useProduct } from '../../hooks/useProduct';
import { useShipping } from '../../hooks/useShipping';

import Logo from '../../components/atoms/Logo';
import Modal from '../../components/atoms/Modal';
import Rating from '../../components/atoms/Rating';
import Header from '../../components/organisms/Header';
import ProductBuyingCard from '../../components/organisms/ProductBuyingCard';
import ShippingCard from '../../components/organisms/ShippingCard';
import { useTheme } from 'styled-components';

import {
    CategoryPath,
    CategoryPathContainer,
    Comment,
    CommentsContainer,
    Container,
    Content,
    Description,
    ImageContainer,
    ImagePreviewContainer,
    PathContainer,
    PathDivider,
    ProductCardContainer,
    ProductContainer,
    ProductInfoContainer
} from './styles';

const Product: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { id }: any = useParams();
    const theme = useTheme();
    const history = useHistory();
    const { getProductById } = useProduct();
    const { address, option } = useShipping();
    const { setLoadingContent } = useLoading();

    const [product, setProduct] = useState<ProductProxy>();
    const [isShippingCardVisible, setShippingCardVisible] = useState(false);

    const initialState = async (): Promise<void> => {
        setLoadingContent(true);

        const productsResponse = await getProductById(id);
        setProduct(productsResponse);

        setLoadingContent(false);
    };

    useEffect(() => {
        initialState();
    }, []);

    const handleShippingOptionsClick = (): void => {
        setShippingCardVisible(true);
    };

    const options = [
        {
            id: 1,
            name: 'Sedex',
            daysToArrive: 4,
            price: 0
        },
        {
            id: 2,
            name: 'PBex',
            daysToArrive: 3,
            price: 7.9
        }
    ];

    const categories: CategoryProxy[] = [
        {
            id: 1,
            name: 'Ação',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 2,
            name: 'Aventura',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 3,
            name: 'Ficção',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ];

    const comments = [
        {
            id: 1,
            stars: 5,
            text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'
        },
        {
            id: 2,
            stars: 4,
            text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: 3,
            stars: 3,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    ];

    const handleBackButtonClick = (): void => {
        history.goBack();
    };

    const handleCategoryClick = (category: CategoryProxy): void => {
        history.push(
            `/products?category=${category.name}&catId=${category.id}`
        );
    };

    return (
        <Container>
            <Header />
            <Content>
                <PathContainer>
                    <button
                        className="category-path-button"
                        onClick={handleBackButtonClick}
                    >
                        Voltar
                    </button>
                    <PathDivider />
                    <CategoryPathContainer>
                        {categories.map((category, index) => (
                            <div key={category.id}>
                                <CategoryPath
                                    key={category.id}
                                    onClick={() =>
                                        handleCategoryClick(category)
                                    }
                                >
                                    {category.name}
                                </CategoryPath>
                                {index === categories.length - 1 ? (
                                    <></>
                                ) : (
                                    <span
                                        style={{
                                            color: 'grey',
                                            marginLeft: 10
                                        }}
                                    >
                                        •
                                    </span>
                                )}
                            </div>
                        ))}
                    </CategoryPathContainer>
                </PathContainer>
                <ProductContainer>
                    <ProductInfoContainer>
                        <ImageContainer>
                            <ImagePreviewContainer
                                className="mini"
                                style={{ borderWidth: product ? 2 : 0 }}
                            >
                                {product &&
                                product.imageUrl &&
                                product.imageUrl !== '' ? (
                                    <img
                                        src={product.imageUrl}
                                        alt="Product Image"
                                    />
                                ) : (
                                    <div className="logo-icon">
                                        <Logo
                                            showTitle={false}
                                            color={
                                                theme.colors.defaultGrey + '88'
                                            }
                                            size={40}
                                        />
                                    </div>
                                )}
                            </ImagePreviewContainer>
                            <ImagePreviewContainer>
                                {product &&
                                product.imageUrl &&
                                product.imageUrl !== '' ? (
                                    <img
                                        src={product.imageUrl}
                                        alt="Product Image"
                                    />
                                ) : (
                                    <div className="logo-icon">
                                        <Logo
                                            showTitle={false}
                                            color={
                                                theme.colors.defaultGrey + '88'
                                            }
                                            size={400}
                                        />
                                    </div>
                                )}
                            </ImagePreviewContainer>
                        </ImageContainer>
                        {product && product.description !== '' && (
                            <Description>
                                <h1>Descrição</h1>
                                <p>{product.description}</p>
                            </Description>
                        )}
                        {product && comments && (
                            <CommentsContainer>
                                <h1>Comentários</h1>
                                {comments.map((comment, index) => (
                                    <Comment
                                        key={comment.id}
                                        style={{
                                            marginTop: index === 0 ? 20 : 40
                                        }}
                                    >
                                        <Rating
                                            rating={comment.stars}
                                            size={20}
                                        />
                                        <p>{comment.text}</p>
                                    </Comment>
                                ))}
                            </CommentsContainer>
                        )}
                    </ProductInfoContainer>
                    <ProductCardContainer>
                        {product && (
                            <ProductBuyingCard
                                product={product}
                                cep={address}
                                shippingOption={option || options[0]}
                                onShippingOptionsClick={
                                    handleShippingOptionsClick
                                }
                                onBuyClick={console.log}
                                onAddCartClick={console.log}
                            />
                        )}
                    </ProductCardContainer>
                </ProductContainer>
            </Content>
            {isShippingCardVisible && (
                <Modal>
                    <ShippingCard
                        options={options}
                        onClose={() => setShippingCardVisible(false)}
                    />
                </Modal>
            )}
        </Container>
    );
};

export default Product;
