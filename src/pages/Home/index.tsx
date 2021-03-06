import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { RolesEnum } from '../../models/enums/user';
import { GetMany } from '../../models/getMany';
import { CategoryProxy } from '../../models/proxies/category/category';
import { ProductProxy } from '../../models/proxies/product/product';

import { useCategory } from '../../hooks/useCategory';
import { useProduct } from '../../hooks/useProduct';
import { useUser } from '../../hooks/useUser';

import { QueryParams } from '../../contexts/productContext';

import FloatButton from '../../components/atoms/FloatButton';
import LoadingDots from '../../components/atoms/LoadingDots';
import Modal from '../../components/atoms/Modal';
import SocialMedia from '../../components/atoms/SocialMedia';
import CategoriesBar from '../../components/molecules/CategoriesBar';
import SellerIdentification from '../../components/molecules/SellerIdentification';
import CustomHeader from '../../components/organisms/CustomHeader';
import CustomProductCard from '../../components/organisms/CustomProductCard';
import Footer from '../../components/organisms/Footer';
import Header from '../../components/organisms/Header';
import ProductList from '../../components/organisms/ProductList';
import { useTheme } from 'styled-components';

import { getRandom, range } from '../../utils/arrayManagement';
import { formatPrice, formatQueryParam } from '../../utils/formatters';

import { ReactComponent as MultiTagIcon } from '../../assets/icons/tag-multiple.svg';
import { ReactComponent as TagIcon } from '../../assets/icons/tag.svg';
import openBook from '../../assets/images/open-book.jpg';

import {
    Container,
    Description,
    FirstPageContainer,
    HeaderContainer,
    Image,
    ImageContainer,
    ModalCard,
    SecondPageContainer,
    ScrollDown,
    TextContainer,
    Title,
    Topic
} from './styles';

const Home: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const history = useHistory();
    const {
        getProductsByCategory,
        getProductsByPrice,
        getProductsOnSale,
        getInterestFree,
        getRecentProducts,
        getMostBought
    } = useProduct();
    const { getCategories, getCategoryById } = useCategory();
    const { me } = useUser();

    const prices: number[] = [30, 40, 50, 60];

    const [modalContent, setModalContent] = useState<
        { id: number; name: string }[]
    >([]);
    const [isLoadingModal, setLoadingModal] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isButtonVisible, setButtonVisible] = useState(true);

    const [isHeaderHidden, setHeaderHidden] = useState(true);
    const [headerPosition, setHeaderPosition] = useState(-100);
    const [randomPrice] = useState(getRandom(prices));
    const [randomCategory] = useState(getRandom(range(1, 5)));
    const [categoryTopic, setCategoryTopic] = useState<CategoryProxy>();
    const [customCardProduct, setCustomCardProduct] = useState<ProductProxy>();
    const [isLoadingCustomCard, setLoadingCustomCard] = useState(false);
    const [categories, setCategories] = useState<CategoryProxy[]>([]);
    const [allCategories, setAllCategories] = useState<CategoryProxy[]>([]);

    const [isSellerModalVisible, setSellerModalVisible] = useState(false);

    const updateElements = (): void => {
        if (window.pageYOffset >= 150 && isHeaderHidden) {
            setHeaderPosition(0);
            setHeaderHidden(false);
        } else if (window.pageYOffset < 150 && !isHeaderHidden) {
            setHeaderPosition(-100);
            setHeaderHidden(true);
        }

        if (
            (document.body.scrollHeight - 300 <=
                window.pageYOffset + window.innerHeight &&
                isButtonVisible) ||
            isSellerModalVisible
        ) {
            const elm = document.getElementById('float-button');
            elm?.classList.add('animate-out');
            setTimeout(() => {
                elm?.classList.add('active');
                elm?.classList.remove('animate-out');
            }, 100);
            setButtonVisible(false);
        } else if (
            document.body.scrollHeight - 300 >
                window.pageYOffset + window.innerHeight &&
            !isButtonVisible
        ) {
            const elm = document.getElementById('float-button');

            elm?.classList.remove('active');
            elm?.classList.add('animate-in');
            setTimeout(() => {
                elm?.classList.remove('animate-in');
            }, 500);
            setButtonVisible(true);
        }
    };

    useEffect(() => {
        getCategoriesList(randomCategory);
        getCustomCardProduct();
        if (history.location.pathname === '/') updateElements();
    }, []);

    useEffect(() => {
        if (history.location.pathname === '/') updateElements();
    }, [isSellerModalVisible]);

    window.onscroll = (): void => {
        if (history.location.pathname === '/') updateElements();
    };

    const scrollDown = (): void => {
        window.scrollTo(0, window.innerHeight);
    };

    const onCategoryClick = (category: CategoryProxy): void => {
        history.push(
            `/products?category=${formatQueryParam(category.name)}&catId=${
                category.id
            }`
        );
    };

    const getCategoriesList = async (randomCat: number): Promise<void> => {
        const categoriesRes = await getCategories(7);
        setCategories(categoriesRes);

        const categoryRes = await getCategoryById(randomCat);
        setCategoryTopic(categoryRes);
    };

    const getCustomCardProduct = async (): Promise<void> => {
        setLoadingCustomCard(true);
        const response = await getRecentProducts({ page: 1, limit: 1 });
        setCustomCardProduct(response.data[0]);
        setLoadingCustomCard(false);
    };

    const getProductsByTopic = async (
        itemsPerPage: number,
        page: number,
        request: (queryParams: QueryParams) => Promise<GetMany<ProductProxy>>
    ): Promise<GetMany<ProductProxy>> => {
        const data = await request({ page, limit: itemsPerPage });
        return data;
    };

    const getProductsByPriceLocal = async (
        itemsPerPage: number,
        page: number
    ): Promise<GetMany<ProductProxy>> => {
        const data = await getProductsByPrice(randomPrice, {
            page,
            limit: itemsPerPage
        });
        return data;
    };

    const getProductsByCategoryLocal = async (
        itemsPerPage: number,
        page: number
    ): Promise<GetMany<ProductProxy>> => {
        const data = await getProductsByCategory(randomCategory, {
            page,
            limit: itemsPerPage
        });
        return data;
    };

    const handleModalClose = (): void => {
        const modal = document.getElementsByClassName('modal-container')[0];
        modal.classList.add('modal-container-move-out');
        setTimeout(() => {
            setModalVisible(false);
        }, 200);
    };

    const handleSeeAllCategories = async (): Promise<void> => {
        setModalVisible(true);
        setLoadingModal(true);

        if (allCategories && allCategories.length > 0) {
            setModalContent(allCategories);
        } else {
            const categories = await getCategories();
            setAllCategories(categories);
            setModalContent(categories);
        }

        setLoadingModal(false);
    };

    const handleFloatButtonClick = (): void => {
        if (me) {
            if (canSell()) {
                history.push('/products/me');
            } else {
                setSellerModalVisible(true);
            }
        } else {
            history.push('/login');
        }
    };

    const handleSellerConfirm = (): void => {
        setSellerModalVisible(false);
    };

    const canSell = (): boolean => {
        return (
            me?.permissions === RolesEnum.SELLER ||
            me?.permissions === RolesEnum.ADMIN
        );
    };

    return (
        <Container theme={theme} className={isSellerModalVisible ? 'ovfh' : ''}>
            <FloatButton
                Icon={canSell() ? MultiTagIcon : TagIcon}
                iconSize={canSell() ? 34 : 24}
                text={canSell() ? 'Meus produtos' : 'Quero vender'}
                onClick={handleFloatButtonClick}
            />
            <FirstPageContainer>
                <ImageContainer>
                    <Image
                        src={openBook}
                        alt="home-background"
                        height={725}
                        width={967}
                    />
                </ImageContainer>
                <CustomHeader />
                {categories && categories.length > 0 && (
                    <CategoriesBar
                        categoriesList={categories}
                        onClick={onCategoryClick}
                        onMoreClick={handleSeeAllCategories}
                    />
                )}
                <TextContainer>
                    <Title>Leia um livro e mude uma vida!</Title>
                    <Description>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </Description>
                    <SocialMedia
                        style={{ position: 'static' }}
                        baseIconColor={theme.colors.defaultDarkBlue}
                    />
                </TextContainer>
                <CustomProductCard
                    isLoading={isLoadingCustomCard}
                    onClick={(product) =>
                        history.push('/products/' + product.id)
                    }
                    product={customCardProduct}
                />
                <ScrollDown onClick={scrollDown}>Role para baixo</ScrollDown>
            </FirstPageContainer>
            <SecondPageContainer>
                <ProductList
                    topicTitle={`Por menos de R$ ${formatPrice(randomPrice)}`}
                    request={getProductsByPriceLocal}
                    onProductClick={(product) =>
                        history.push('/products/' + product.id)
                    }
                />
                <ProductList
                    topicTitle={`Ofertas`}
                    request={(i: number, p: number) =>
                        getProductsByTopic(i, p, getProductsOnSale)
                    }
                    onProductClick={(product) =>
                        history.push('/products/' + product.id)
                    }
                />
                <ProductList
                    topicTitle={`${categoryTopic?.name || 'Por categoria'}`}
                    request={(i: number, p: number) =>
                        getProductsByCategoryLocal(i, p)
                    }
                    onProductClick={(product) =>
                        history.push('/products/' + product.id)
                    }
                />
                <ProductList
                    topicTitle={`Parcelamento sem juros`}
                    request={(i: number, p: number) =>
                        getProductsByTopic(i, p, getInterestFree)
                    }
                    onProductClick={(product) =>
                        history.push('/products/' + product.id)
                    }
                />
                <ProductList
                    topicTitle={`Adicionados recentemente`}
                    request={(i: number, p: number) =>
                        getProductsByTopic(i, p, getRecentProducts)
                    }
                    onProductClick={(product) =>
                        history.push('/products/' + product.id)
                    }
                />
                <ProductList
                    topicTitle={`Mais comprados`}
                    request={(i: number, p: number) =>
                        getProductsByTopic(i, p, getMostBought)
                    }
                    onProductClick={(product) =>
                        history.push('/products/' + product.id)
                    }
                />
            </SecondPageContainer>
            <HeaderContainer
                style={{ transform: `translateY(${headerPosition}px)` }}
            >
                <Header />
            </HeaderContainer>
            <Footer />
            {isModalVisible && (
                <Modal onClickOutside={handleModalClose}>
                    <ModalCard
                        className="modal-container modal-container-move-in"
                        style={{ display: isLoadingModal ? 'flex' : 'block' }}
                    >
                        {isLoadingModal ? (
                            <LoadingDots />
                        ) : (
                            <>
                                <h1>Categorias</h1>
                                <div
                                    className="modal-content"
                                    style={{
                                        overflowY:
                                            modalContent.length === 12
                                                ? 'hidden'
                                                : 'scroll'
                                    }}
                                >
                                    {modalContent.map((content) => (
                                        <Topic
                                            key={content.id}
                                            onClick={() =>
                                                onCategoryClick(
                                                    content as CategoryProxy
                                                )
                                            }
                                        >
                                            {content.name}
                                        </Topic>
                                    ))}
                                </div>
                            </>
                        )}
                    </ModalCard>
                </Modal>
            )}
            {isSellerModalVisible && (
                <Modal onClickOutside={() => setSellerModalVisible(false)}>
                    <SellerIdentification
                        onConfirmClick={handleSellerConfirm}
                    />
                </Modal>
            )}
        </Container>
    );
};

export default Home;
