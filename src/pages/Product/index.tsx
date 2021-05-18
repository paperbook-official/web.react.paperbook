import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ActionResultEnum } from '../../models/enums/actionResultTypes';
import { CategoryProxy } from '../../models/proxies/category/category';
import { ProductProxy } from '../../models/proxies/product/product';
import { ProductReviewProxy } from '../../models/proxies/product/productReview';
import { RatingProxy } from '../../models/proxies/rating/rating';

import { useActionResult } from '../../hooks/useActionResult';
import { useCart } from '../../hooks/useCart';
import { useLoading } from '../../hooks/useLoading';
import { useProduct } from '../../hooks/useProduct';
import { useShipping } from '../../hooks/useShipping';

import Logo from '../../components/atoms/Logo';
import Modal from '../../components/atoms/Modal';
import Rating from '../../components/atoms/Rating';
import Footer from '../../components/organisms/Footer';
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
    const {
        getProductById,
        getProductCategories,
        getProductRatings,
        getProductReview
    } = useProduct();
    const { address, option, options, setOption } = useShipping();
    const { insertInLocalCart } = useCart();
    const { setLoadingContent } = useLoading();
    const { show } = useActionResult();

    const [product, setProduct] = useState<ProductProxy>();
    const [categories, setCategories] = useState<CategoryProxy[]>([]);
    const [ratings, setRatings] = useState<RatingProxy[]>([]);
    const [review, setReview] = useState<ProductReviewProxy>();
    const [amount, setAmount] = useState(1);

    const [isShippingCardVisible, setShippingCardVisible] = useState(false);

    const initialState = async (): Promise<void> => {
        setLoadingContent(true);

        const productsResponse = await getProductById(parseInt(id));
        setProduct(productsResponse);

        if (!option) {
            setOption(options[0]);
        }

        const categoriesResponse = await getProductCategories(
            productsResponse.id
        );
        setCategories(categoriesResponse);

        const ratingsResponse = await getProductRatings(productsResponse.id);
        setRatings(ratingsResponse);

        const reviewResponse = await getProductReview(productsResponse.id);
        setReview(reviewResponse);

        setLoadingContent(false);
    };

    useEffect(() => {
        initialState();
    }, []);

    const handleShippingOptionsClick = (): void => {
        setShippingCardVisible(true);
    };

    const handleBackButtonClick = (): void => {
        history.goBack();
    };

    const handleCategoryClick = (category: CategoryProxy): void => {
        history.push(
            `/products?category=${category.name}&catId=${category.id}`
        );
    };

    const handleBuyClick = (product: ProductProxy): void => {
        insertInLocalCart({ product, amount });
        history.push('/cart');
    };

    const handleAddCartClick = (product: ProductProxy): void => {
        insertInLocalCart({ product, amount });
        show('Adicionado ao carrinho!', product.name, ActionResultEnum.SUCCESS);
    };

    const handleAmountChange = (amount: number): void => {
        setAmount(amount);
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
                        {product && ratings && ratings.length > 0 && (
                            <CommentsContainer>
                                <h1>Comentários</h1>
                                {ratings.map((rating, index) => (
                                    <Comment
                                        key={rating.id}
                                        style={{
                                            marginTop: index === 0 ? 20 : 40
                                        }}
                                    >
                                        <Rating
                                            rating={rating.stars}
                                            size={20}
                                        />
                                        <p>{rating.text}</p>
                                    </Comment>
                                ))}
                            </CommentsContainer>
                        )}
                    </ProductInfoContainer>
                    <ProductCardContainer>
                        {product && review && (
                            <ProductBuyingCard
                                product={product}
                                review={review}
                                cep={address}
                                shippingOption={option}
                                onShippingOptionsClick={
                                    handleShippingOptionsClick
                                }
                                onBuyClick={handleBuyClick}
                                onAddCartClick={handleAddCartClick}
                                onAmountChange={handleAmountChange}
                            />
                        )}
                    </ProductCardContainer>
                </ProductContainer>
            </Content>
            <Footer />
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
