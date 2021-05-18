import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { GetMany } from '../../models/getMany';
import { CategoryProxy } from '../../models/proxies/category/category';
import { ProductProxy } from '../../models/proxies/product/product';

import { useCategory } from '../../hooks/useCategory';
import { useProduct } from '../../hooks/useProduct';

import FloatButton from '../../components/atoms/FloatButton';
import LoadingDots from '../../components/atoms/LoadingDots';
import Modal from '../../components/atoms/Modal';
import SocialMedia from '../../components/atoms/SocialMedia';
import CategoriesBar from '../../components/molecules/CategoriesBar';
import CustomHeader from '../../components/organisms/CustomHeader';
import CustomProductCard from '../../components/organisms/CustomProductCard';
import Footer from '../../components/organisms/Footer';
import Header from '../../components/organisms/Header';
import ProductList from '../../components/organisms/ProductList';
import { useTheme } from 'styled-components';

import { getRandom } from '../../utils/arrayManagement';
import { formatPrice, formatQueryParam } from '../../utils/formatters';

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
        getProductsByPrice,
        getProductsOnSale,
        getInterestFree,
        getRecentProducts,
        getWellRated
    } = useProduct();
    const { getCategories } = useCategory();

    const prices: number[] = [30, 40, 50, 60];

    const [modalContent, setModalContent] = useState<
        { id: number; name: string }[]
    >([]);
    const [isLoadingModal, setLoadingModal] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const [isHeaderHidden, setHeaderHidden] = useState(true);
    const [headerPosition, setHeaderPosition] = useState(-100);
    const [randomPrice] = useState(getRandom(prices));
    const [customCardProduct, setCustomCardProduct] = useState<ProductProxy>();
    const [isLoadingCustomCard, setLoadingCustomCard] = useState(false);
    const [categories, setCategories] = useState<CategoryProxy[]>([]);
    const [allCategories, setAllCategories] = useState<CategoryProxy[]>([]);

    useEffect(() => {
        getCategoriesList();
        getCustomCardProduct();
        if (window.pageYOffset >= 150 && isHeaderHidden) {
            setHeaderPosition(0);
        } else if (window.pageYOffset < 150 && !isHeaderHidden) {
            setHeaderPosition(-100);
        }
    }, []);

    window.onscroll = (): void => {
        if (window.pageYOffset >= 150 && isHeaderHidden) {
            setHeaderPosition(0);
            setHeaderHidden(false);
        } else if (window.pageYOffset < 150 && !isHeaderHidden) {
            setHeaderPosition(-100);
            setHeaderHidden(true);
        }
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

    const getCategoriesList = async (): Promise<void> => {
        const categoriesRes = await getCategories(7);
        setCategories(categoriesRes);
    };

    const getCustomCardProduct = async (): Promise<void> => {
        setLoadingCustomCard(true);
        const responseSale = await getProductsOnSale(1, 0, 1);
        if (responseSale.data[0]) {
            setCustomCardProduct(responseSale.data[0]);
        } else {
            const responseIFree = await getInterestFree(1, 0, 1);
            if (responseIFree.data[0]) {
                setCustomCardProduct(responseIFree.data[0]);
            } else {
                const response = await getRecentProducts(1, 0, 1);
                setCustomCardProduct(response.data[0]);
            }
        }
        setLoadingCustomCard(false);
    };

    const getProductsByTopic = async (
        itemsPerPage: number,
        page: number,
        request: (
            page: number,
            offset: number,
            itemsPerPage: number,
            join?: string[],
            orderBy?: string[]
        ) => Promise<GetMany<ProductProxy>>
    ): Promise<GetMany<ProductProxy>> => {
        const offset = 0;
        const data = await request(page, offset, itemsPerPage);
        return data;
    };

    const getProductsByPriceLocal = async (
        itemsPerPage: number,
        page: number
    ): Promise<GetMany<ProductProxy>> => {
        const offset = 0;
        const data = await getProductsByPrice(
            randomPrice,
            page,
            offset,
            itemsPerPage
        );
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

    return (
        <Container theme={theme}>
            <FloatButton
                Icon={TagIcon}
                text="Quero vender"
                onClick={console.log}
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
                    topicTitle={`Bem avaliados`}
                    request={(i: number, p: number) =>
                        getProductsByTopic(i, p, getWellRated)
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
        </Container>
    );
};

export default Home;
