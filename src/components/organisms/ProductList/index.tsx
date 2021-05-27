import React, { useEffect, useState } from 'react';

import { GetMany } from '../../../models/getMany';
import { ProductProxy } from '../../../models/proxies/product/product';

import { useLoading } from '../../../hooks/useLoading';

import { useTheme } from 'styled-components';

import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrow-right.svg';

import LoadingDots from '../../atoms/LoadingDots';
import ProductCard from '../ProductCard';
import {
    ChangePageIconContainer,
    Container,
    ListContainer,
    TopicTitle
} from './styles';

interface ProductListProps {
    topicTitle: string;
    onProductClick(product: ProductProxy): void;
    request(itemsPerPage: number, page: number): Promise<GetMany<ProductProxy>>;
    style?: React.CSSProperties;
}

const productAmount =
    window.innerWidth > 1400 ? 5 : window.innerWidth > 1130 ? 4 : 3;

const ProductList: React.FC<ProductListProps> = ({
    topicTitle,
    request,
    onProductClick,
    style
}: ProductListProps) => {
    const theme = useTheme();
    const { isLoadingContent, setLoadingContent } = useLoading();

    const [itemsPerPage, setItemsPerPage] = useState(0);
    const [pagesLoaded, setPagesLoaded] = useState(1);
    const [page, setPage] = useState(1);
    const [pageAmount, setPageAmount] = useState(1);
    const [productsList, setProductsList] = useState<ProductProxy[]>([]);
    const [currentProducts, setCurrentProducts] = useState<ProductProxy[]>([]);
    const [totalProducts, setTotalProducts] = useState<number | null>(null);
    const [isLoading, setLoading] = useState(false);

    const setInitialState = async (): Promise<void> => {
        setLoading(true);

        const response = await request(productAmount, page);

        setPageAmount(response.pageCount);
        setProductsList(response.data);
        setCurrentProducts(response.data);
        setTotalProducts(response.total);

        setLoading(false);
    };

    useEffect(() => {
        setItemsPerPage(productAmount);
        setInitialState();
    }, []);

    const getOffset = (nPage: number): number => {
        return (nPage - 1) * itemsPerPage;
    };

    const getPageContent = (
        nPage: number,
        list?: ProductProxy[]
    ): ProductProxy[] => {
        const offset = getOffset(nPage);
        const products =
            list || productsList.slice(offset, offset + itemsPerPage);

        return products.length === itemsPerPage || nPage === 1
            ? products
            : [
                  ...productsList.slice(
                      offset - (itemsPerPage - products.length),
                      offset
                  ),
                  ...products
              ];
    };

    const nextPage = async (): Promise<void> => {
        setLoadingContent(true);

        const nPage = page + 1;
        const currentProdList = [...productsList];

        if (nPage > pagesLoaded) {
            setPagesLoaded(nPage);

            const response = await request(itemsPerPage, nPage);

            setProductsList([...currentProdList, ...response.data]);
            setCurrentProducts(getPageContent(nPage, response.data));
        } else {
            setCurrentProducts(getPageContent(nPage));
        }

        setPage(nPage);

        setLoadingContent(false);
    };

    const previousPage = (): void => {
        const nPage = page - 1 > 0 ? page - 1 : 1;
        setCurrentProducts(getPageContent(nPage));
        setPage(nPage);
    };

    const hasMorePages = (): boolean => {
        return pageAmount > page;
    };

    const getProductRating = (product: ProductProxy): number => {
        if (product.ratings) {
            const stars = product.ratings.map((rating) => rating.stars || 0);
            const average = stars.reduce((a, b) => a + b, 0);
            return average || 0;
        }
        return 0;
    };

    return (
        <Container
            style={style}
            isNotVisible={totalProducts !== null && totalProducts < 3}
        >
            <TopicTitle>{topicTitle}</TopicTitle>
            <ListContainer
                hasLess={totalProducts !== null && totalProducts < itemsPerPage}
            >
                {isLoading ? (
                    <LoadingDots />
                ) : (
                    <>
                        {' '}
                        <ChangePageIconContainer
                            onClick={previousPage}
                            style={{
                                marginLeft: 20,
                                opacity: !isLoadingContent && page > 1 ? 1 : 0,
                                pointerEvents:
                                    !isLoadingContent && page > 1
                                        ? 'visible'
                                        : 'none'
                            }}
                        >
                            <ArrowIcon
                                style={{ transform: 'rotate(180deg)' }}
                                color={theme.colors.defaultHighlightGreyBlue}
                            />
                        </ChangePageIconContainer>
                        {currentProducts?.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={onProductClick}
                                rating={getProductRating(product)}
                            />
                        ))}
                        <ChangePageIconContainer
                            onClick={nextPage}
                            style={{
                                marginRight: 20,
                                opacity:
                                    !isLoadingContent && hasMorePages() ? 1 : 0,
                                pointerEvents:
                                    !isLoadingContent && hasMorePages()
                                        ? 'visible'
                                        : 'none'
                            }}
                        >
                            <ArrowIcon
                                color={theme.colors.defaultHighlightGreyBlue}
                            />
                        </ChangePageIconContainer>{' '}
                    </>
                )}
            </ListContainer>
        </Container>
    );
};

export default ProductList;
