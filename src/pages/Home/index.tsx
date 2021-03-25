import React, { useEffect, useState } from 'react';

import { ManyProductProxy, ProductProxy } from '../../models/proxies/product';

import { useProduct } from '../../hooks/useProduct';

import SocialMedia from '../../components/atoms/SocialMedia';
import CategoriesBar from '../../components/molecules/CategoriesBar';
import CustomHeader from '../../components/organisms/CustomHeader';
import CustomProductCard from '../../components/organisms/CustomProductCard';
import Header from '../../components/organisms/Header';
import ProductList from '../../components/organisms/ProductList';
import { useTheme } from 'styled-components';

import { getRandom } from '../../utils/arrayManagement';
import { formatPrice } from '../../utils/formatters';

import openBook from '../../assets/images/open-book.jpg';

import {
    Container,
    Description,
    FirstPageContainer,
    HeaderContainer,
    Image,
    ImageContainer,
    SecondPageContainer,
    ScrollDown,
    TextContainer,
    Title
} from './styles';

const Home: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const {
        getProductsByPrice,
        getProductsOnSale,
        getInterestFree,
        getRecentProducts,
        getMostBought
    } = useProduct();

    const prices: number[] = [10, 20, 30, 40, 50];

    const [isHeaderHidden, setHeaderHidden] = useState(true);
    const [headerPosition, setHeaderPosition] = useState(-100);
    const [randomPrice] = useState(getRandom(prices));
    const [customCardProduct, setCustomCardProduct] = useState<ProductProxy>();
    const [isLoadingCustomCard, setLoadingCustomCard] = useState(false);

    useEffect(() => {
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

    const categories = [
        {
            id: 1,
            name: 'Ficção'
        },
        {
            id: 2,
            name: 'Aventura'
        },
        {
            id: 3,
            name: 'Romance'
        },
        {
            id: 4,
            name: 'Ação'
        },
        {
            id: 5,
            name: 'Didáticos'
        },
        {
            id: 6,
            name: 'Autoconhecimento'
        },
        {
            id: 7,
            name: 'Conhecimentos Gerais'
        },
        {
            id: 8,
            name: 'Figuras em Quadrinho'
        },
        {
            id: 9,
            name: 'Animais'
        },
        {
            id: 10,
            name: 'Engenharia'
        },
        {
            id: 11,
            name: 'Medicina'
        }
    ];

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
            join?: string,
            orderBy?: string[]
        ) => Promise<ManyProductProxy>
    ): Promise<ManyProductProxy> => {
        const offset = 0;
        const data = await request(page, offset, itemsPerPage);
        return data;
    };

    const getProductsByPriceLocal = async (
        itemsPerPage: number,
        page: number
    ): Promise<ManyProductProxy> => {
        const offset = 0;
        const data = await getProductsByPrice(
            randomPrice,
            page,
            offset,
            itemsPerPage
        );
        return data;
    };

    return (
        <Container theme={theme}>
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
                <CategoriesBar
                    categoriesList={categories}
                    onClick={console.log}
                    onMoreClick={console.log}
                />
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
                    onClick={console.log}
                    product={customCardProduct}
                />
                <ScrollDown onClick={scrollDown}>Role para baixo</ScrollDown>
            </FirstPageContainer>
            <SecondPageContainer>
                <ProductList
                    topicTitle={`Por menos de R$ ${formatPrice(randomPrice)}`}
                    request={getProductsByPriceLocal}
                    onProductClick={(product) => console.log(product)}
                />
                <ProductList
                    topicTitle={`Ofertas`}
                    request={(i: number, p: number) =>
                        getProductsByTopic(i, p, getProductsOnSale)
                    }
                    onProductClick={(product) => console.log(product)}
                />
                <ProductList
                    topicTitle={`Parcelamento sem juros`}
                    request={(i: number, p: number) =>
                        getProductsByTopic(i, p, getInterestFree)
                    }
                    onProductClick={(product) => console.log(product)}
                />
                <ProductList
                    topicTitle={`Adicionados recentemente`}
                    request={(i: number, p: number) =>
                        getProductsByTopic(i, p, getRecentProducts)
                    }
                    onProductClick={(product) => console.log(product)}
                />
                <ProductList
                    topicTitle={`Mais comprados`}
                    request={(i: number, p: number) =>
                        getProductsByTopic(i, p, getMostBought)
                    }
                    onProductClick={(product) => console.log(product)}
                />
            </SecondPageContainer>
            <HeaderContainer
                style={{ transform: `translateY(${headerPosition}px)` }}
            >
                <Header />
            </HeaderContainer>
        </Container>
    );
};

export default Home;
