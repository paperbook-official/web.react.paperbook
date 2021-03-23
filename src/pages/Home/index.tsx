import React, { useEffect, useState } from 'react';

import { ProductProxy } from '../../models/proxies/product';

import SocialMedia from '../../components/atoms/SocialMedia';
import CategoriesBar from '../../components/molecules/CategoriesBar';
import CustomHeader from '../../components/organisms/CustomHeader';
import CustomProductCard from '../../components/organisms/CustomProductCard';
import Header from '../../components/organisms/Header';
import ProductFlatList from '../../components/organisms/ProductList';
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

    const prices: number[] = [10, 20, 30, 40, 50];

    const [headerPosition, setHeaderPosition] = useState(-100);
    const [contentOpacity, setContentOpacity] = useState(1);
    const [scrollDownOpacity, setScrollDownOpacity] = useState(1);
    const [randomPrice] = useState(formatPrice(getRandom(prices)));

    useEffect(() => {
        if (window.pageYOffset >= 150) setHeaderPosition(0);
    }, []);

    window.onscroll = () => {
        if (window.pageYOffset >= 150) setHeaderPosition(0);
        else setHeaderPosition(-100);

        setContentOpacity(
            1 - (window.pageYOffset - window.innerHeight / 2 + 200) / 200
        );

        setScrollDownOpacity(
            1 - (window.pageYOffset - window.innerHeight / 2 + 300) / 300
        );
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

    const user = {
        id: 3,
        createdAt: '2021-03-17T02:01:03.708Z',
        updatedAt: '2021-03-17T02:01:03.708Z',
        isActive: true,
        name: 'usuario',
        lastName: 'vendedor',
        email: 'seller@email.com',
        cpf: '12345678910',
        permissions: 'seller',
        phone: '15988776655',
        addresses: []
    };

    const products = [
        {
            id: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true,
            name: 'The Science of Selling',
            description: 'bla bla bla',
            fullPrice: 89.9,
            installmentPrice: 89.9,
            installmentAmount: 6,
            discountAmount: 0.2,
            stockAmount: 978,
            userId: user.id,
            user: user
        },
        {
            id: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true,
            name: 'Harry Potter e as Relíquias da Morte',
            description: 'bla bla bla',
            fullPrice: 44.9,
            installmentPrice: 50.0,
            installmentAmount: 5,
            discountAmount: 0,
            stockAmount: 978,
            userId: user.id,
            user: user
        },
        {
            id: 3,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true,
            name: 'Clean Code',
            description: 'bla bla bla',
            fullPrice: 39.9,
            installmentPrice: 39.9,
            installmentAmount: 4,
            discountAmount: 0,
            stockAmount: 978,
            userId: user.id,
            user: user
        },
        {
            id: 4,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true,
            name: 'Crepúsculo: Amanhecer',
            description: 'bla bla bla',
            fullPrice: 79.9,
            installmentPrice: 89.9,
            installmentAmount: 8,
            discountAmount: 0.2,
            stockAmount: 978,
            userId: user.id,
            user: user
        },
        {
            id: 5,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true,
            name: 'JAVA',
            description: 'bla bla bla',
            fullPrice: 89.9,
            installmentPrice: 89.9,
            installmentAmount: 6,
            discountAmount: 0.2,
            stockAmount: 978,
            userId: user.id,
            user: user
        },
        {
            id: 6,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true,
            name: 'Javascript: Web in your hands',
            description: 'bla bla bla',
            fullPrice: 89.9,
            installmentPrice: 89.9,
            installmentAmount: 6,
            discountAmount: 0.2,
            stockAmount: 978,
            userId: user.id,
            user: user
        },
        {
            id: 7,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true,
            name: 'The Science of Selling',
            description: 'bla bla bla',
            fullPrice: 89.9,
            installmentPrice: 89.9,
            installmentAmount: 6,
            discountAmount: 0.2,
            stockAmount: 978,
            userId: user.id,
            user: user
        },
        {
            id: 8,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true,
            name: 'The of Selling',
            description: 'bla bla bla',
            fullPrice: 89.9,
            installmentPrice: 89.9,
            installmentAmount: 6,
            discountAmount: 0.2,
            stockAmount: 978,
            userId: user.id,
            user: user
        },
        {
            id: 9,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true,
            name: 'The Selling',
            description: 'bla bla bla',
            fullPrice: 89.9,
            installmentPrice: 89.9,
            installmentAmount: 6,
            discountAmount: 0.2,
            stockAmount: 978,
            userId: user.id,
            user: user
        },
        {
            id: 10,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true,
            name: 'The Science of',
            description: 'bla bla bla',
            fullPrice: 89.9,
            installmentPrice: 89.9,
            installmentAmount: 6,
            discountAmount: 0.2,
            stockAmount: 978,
            userId: user.id,
            user: user
        },
        {
            id: 11,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true,
            name: 'Third',
            description: 'bla bla bla',
            fullPrice: 89.9,
            installmentPrice: 89.9,
            installmentAmount: 6,
            discountAmount: 0.2,
            stockAmount: 978,
            userId: user.id,
            user: user
        }
    ];

    const getProductsByPrice = (
        itemsPerPage: number,
        page: number
    ): ProductProxy[] => {
        const offset = (page - 1) * itemsPerPage;
        return products.slice(offset, offset + itemsPerPage);
    };

    return (
        <Container theme={theme}>
            <FirstPageContainer>
                <ImageContainer>
                    <Image src={openBook} alt="home-background" />
                </ImageContainer>
                <CustomHeader />
                <CategoriesBar
                    categoriesList={categories}
                    onClick={console.log}
                    onMoreClick={console.log}
                />
                <TextContainer style={{ opacity: contentOpacity }}>
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
                    style={{ opacity: contentOpacity }}
                    onClick={console.log}
                    product={products[0]}
                    image="https://i1.wp.com/sellingsherpa.com/wp-content/uploads/2021/01/science-of-selling.png?fit=2380%2C700&ssl=1"
                />
                <ScrollDown
                    style={{
                        opacity: scrollDownOpacity,
                        display:
                            window.pageYOffset > window.innerHeight / 2
                                ? 'none'
                                : 'inline-block'
                    }}
                    onClick={scrollDown}
                >
                    Role para baixo
                </ScrollDown>
            </FirstPageContainer>
            <SecondPageContainer>
                <ProductFlatList
                    style={{ marginTop: 120 }}
                    topicTitle={`Por menos de R$ ${randomPrice}`}
                    request={getProductsByPrice}
                    onProductClick={(product) => console.log(product)}
                />
                <ProductFlatList
                    topicTitle={`Ofertas`}
                    request={getProductsByPrice}
                    onProductClick={(product) => console.log(product)}
                />
                <ProductFlatList
                    topicTitle={`Parcelamento sem juros`}
                    request={getProductsByPrice}
                    onProductClick={(product) => console.log(product)}
                />
                <ProductFlatList
                    topicTitle={`Adicionados recentemente`}
                    request={getProductsByPrice}
                    onProductClick={(product) => console.log(product)}
                />
                <ProductFlatList
                    topicTitle={`Mais comprados`}
                    request={getProductsByPrice}
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
