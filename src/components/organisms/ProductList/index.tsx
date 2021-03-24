import React, { useEffect, useState } from 'react';

import {
    ManyProductProxy,
    ProductProxy
} from '../../../models/proxies/product';

import { useTheme } from 'styled-components';

import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrow-right.svg';

import ProductCard from '../ProductCard';
import {
    ChangePageIconContainer,
    Container,
    FlatListContainer,
    TopicTitle
} from './styles';

interface ProductFlatListProps {
    topicTitle: string;
    onProductClick(product: ProductProxy): void;
    request(itemsPerPage: number, page: number): Promise<ManyProductProxy>;
    style?: React.CSSProperties;
}

const productAmount =
    window.innerWidth > 1400 ? 5 : window.innerWidth > 1130 ? 4 : 3;

const ProductFlatList: React.FC<ProductFlatListProps> = ({
    topicTitle,
    request,
    onProductClick,
    style
}: ProductFlatListProps) => {
    const theme = useTheme();

    const [itemsPerPage, setItemsPerPage] = useState(0);
    const [page, setPage] = useState(1);
    const [productsList, setProductsList] = useState<ProductProxy[]>([]);
    const [currentProducts, setCurrentProducts] = useState<ProductProxy[]>([]);
    const [totalProducts, setTotalProducts] = useState<number | null>(null);

    const setInitialState = async (): Promise<void> => {
        const response = await request(productAmount * 2, page);
        setProductsList(response.data);
        setCurrentProducts(response.data.slice(0, productAmount));
        setTotalProducts(response.total);
    };

    useEffect(() => {
        setItemsPerPage(productAmount);
        setInitialState();
    }, []);

    const getOffset = (nPage: number): number => {
        return (nPage - 1) * itemsPerPage;
    };

    const getPageContent = (nPage: number): ProductProxy[] => {
        const offset = getOffset(nPage);
        const products = productsList.slice(offset, offset + itemsPerPage);

        return products.length === itemsPerPage || nPage === 1
            ? products
            : productsList.slice(
                  offset - (itemsPerPage - products.length),
                  offset + itemsPerPage
              );
    };

    const nextPage = async (): Promise<void> => {
        const nPage = page + 1;
        if (totalProducts && totalProducts > productsList.length) {
            const response = await request(itemsPerPage, nPage + 1);
            setProductsList([...productsList, ...response.data]);
        }
        setCurrentProducts(getPageContent(nPage));
        setPage(nPage);
    };

    const previousPage = (): void => {
        const nPage = page - 1 > 0 ? page - 1 : 1;
        setCurrentProducts(getPageContent(nPage));
        setPage(nPage);
    };

    const hasMorePages = (): boolean => {
        return (
            !!totalProducts &&
            totalProducts > itemsPerPage &&
            totalProducts > page * itemsPerPage
        );
    };

    return (
        <Container
            style={style}
            isVisible={!!totalProducts && totalProducts > 2}
        >
            <TopicTitle>{topicTitle}</TopicTitle>
            <FlatListContainer>
                <ChangePageIconContainer
                    onClick={previousPage}
                    style={{
                        marginLeft: 20,
                        opacity: page > 1 ? 1 : 0,
                        pointerEvents: page > 1 ? 'visible' : 'none'
                    }}
                >
                    <ArrowIcon
                        style={{ transform: 'rotate(180deg)' }}
                        color={theme.colors.defaultHighlightGreyBlue}
                    />
                </ChangePageIconContainer>
                {currentProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        image="https://images-na.ssl-images-amazon.com/images/I/81PHloIwKnL.jpg"
                        onClick={onProductClick}
                        rating={4}
                    />
                ))}
                <ChangePageIconContainer
                    onClick={nextPage}
                    style={{
                        marginRight: 20,
                        opacity: hasMorePages() ? 1 : 0,
                        pointerEvents: hasMorePages() ? 'visible' : 'none'
                    }}
                >
                    <ArrowIcon color={theme.colors.defaultHighlightGreyBlue} />
                </ChangePageIconContainer>
            </FlatListContainer>
        </Container>
    );
};

export default ProductFlatList;
