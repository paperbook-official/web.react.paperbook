import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { BrStatesEnum } from '../../models/enums/brStates';
import { CategoryProxy } from '../../models/proxies/category';
import { ManyProductProxy, ProductProxy } from '../../models/proxies/product';

import { useCategory } from '../../hooks/useCategory';
import { useLoading } from '../../hooks/useLoading';
import { useProduct } from '../../hooks/useProduct';
import useQuery from '../../hooks/useQuery';

import Paginator from '../../components/atoms/Paginator';
import SortByDropdown from '../../components/atoms/SortByDropdown';
import Header from '../../components/organisms/Header';
import ProductCard from '../../components/organisms/ProductCard';
import { useTheme } from 'styled-components';

import {
    formatQueryToCommon,
    insertParamInQuery,
    removeQueryParam
} from '../../utils/formatters';

import {
    Container,
    Content,
    Divider,
    InfoContainer,
    ListContainer,
    PriceButton,
    PriceField,
    PriceFieldLabel,
    PriceFieldContainer,
    PriceRangeContainer,
    ResultNotFound,
    Title,
    TitleContainer,
    Topic,
    TopicsContainer,
    TotalMatches
} from './styles';

const sortOptions = ['Mais Relevantes', 'Menor Preço', 'Maior Preço'];
const itemsPerPage = 3;

const Search: React.FC = (): JSX.Element => {
    const query = useQuery();
    const history = useHistory();
    const theme = useTheme();
    const { getProducts } = useProduct();
    const { isLoadingContent, setLoadingContent } = useLoading();
    const { getCategories } = useCategory();

    const [title, setTitle] = useState('');
    const [totalMatches, setTotalMatches] = useState(0);
    const [products, setProducts] = useState<ProductProxy[]>([]);
    const [categories, setCategories] = useState<CategoryProxy[]>([]);
    const [brStates, setBrStates] = useState<string[][]>();
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState<number>();

    const [page, setPage] = useState(1);
    const [pageAmount, setPageAmount] = useState(0);

    const isState = (state: string): state is keyof typeof BrStatesEnum => {
        return Object.keys(BrStatesEnum).indexOf(state) !== -1;
    };

    const getBrStates = (): void => {
        const states: string[][] = [];
        const queryState = query.get('state');

        if (queryState && isState(queryState)) {
            states.push([queryState, BrStatesEnum[queryState]]);
        }

        while (states.length < 9) {
            for (const state in BrStatesEnum) {
                if (isState(state)) {
                    const brState = BrStatesEnum[state];
                    if (
                        Math.random() >= 0.4 &&
                        !states.join().includes(brState)
                    ) {
                        states.push([state, brState]);
                        if (states.length === 9) break;
                    }
                }
            }
        }
        states.sort((s1, s2) => (s1[1] < s2[1] ? -1 : 1));
        setBrStates(states);
    };

    const setQueryPage = (): number => {
        const queryPage = query.get('page');
        if (queryPage) {
            setPage(parseInt(queryPage));
        } else {
            const location = history.location;
            const origUrl = location.pathname + location.search;
            const url = insertParamInQuery(origUrl, 'page', 1);
            history.push(url);
        }
        return parseInt(queryPage || '1');
    };

    const initialState = async (): Promise<void> => {
        setLoadingContent(true);

        const currentPage = setQueryPage();

        const queryToCommon = formatQueryToCommon(
            query.get('search') || query.get('category') || ''
        );
        setTitle(queryToCommon);

        const responseCat = await getCategories(9);
        setCategories(responseCat);
        getBrStates();

        const response = await getProducts(currentPage, 0, itemsPerPage);

        setTotalMatches(response.total);
        setPageAmount(Math.ceil(response.total / itemsPerPage));
        setProducts(response.data);

        const querySort = query.get('orderBy');
        if (querySort) {
            setSortBy(querySort.includes('DESC') ? 3 : 2);
        } else {
            setSortBy(1);
        }

        setLoadingContent(false);
    };

    useEffect(() => {
        initialState();
    }, []);

    const handleCategoryClick = (category: CategoryProxy) => {
        const location = history.location;
        const origUrl = location.pathname + location.search;
        const url = insertParamInQuery(origUrl, 'category', category.name);

        if (decodeURIComponent(url) !== decodeURIComponent(origUrl)) {
            const to = removeQueryParam(url, 'page');
            history.push(to);
            window.location.reload();
        }
    };

    const handleLocalClick = (state: string) => {
        const location = history.location;
        const origUrl = location.pathname + location.search;
        const url = insertParamInQuery(origUrl, 'state', state);

        if (decodeURIComponent(url) !== decodeURIComponent(origUrl)) {
            const to = removeQueryParam(url, 'page');
            history.push(to);
            window.location.reload();
        }
    };

    const changePrice = (price: string, mode: string) => {
        const isNan = isNaN(parseFloat(price));
        const newPrice = isNan ? '' : parseFloat(price).toString();
        if (mode === 'min') {
            setMinPrice(newPrice);
        } else {
            setMaxPrice(newPrice);
        }
    };

    const handleInterestFree = (): void => {
        const location = history.location;
        const origUrl = location.pathname + location.search;
        const url = insertParamInQuery(origUrl, 'interestFree', 'true');

        if (decodeURIComponent(url) !== decodeURIComponent(origUrl)) {
            const to = removeQueryParam(url, 'page');
            history.push(to);
            window.location.reload();
        }
    };

    const handlePriceFilterClick = (min: string, max: string): void => {
        const location = history.location;
        const origUrl = location.pathname + location.search;

        let url = origUrl;

        if (min && min.length > 0) {
            url = insertParamInQuery(origUrl, 'minPrice', min);
        } else {
            url = removeQueryParam(origUrl, 'minPrice');
        }

        if (max && max.length > 0) {
            url = insertParamInQuery(url, 'maxPrice', max);
        } else {
            url = removeQueryParam(url, 'maxPrice');
        }

        if (decodeURIComponent(url) !== decodeURIComponent(origUrl)) {
            const to = removeQueryParam(url, 'page');
            history.push(to);
            window.location.reload();
        }
    };

    const handleSortClick = (option: number): void => {
        const location = history.location;
        const origUrl = location.pathname + location.search;

        if (option !== 0) {
            const url = insertParamInQuery(
                origUrl,
                'orderBy',
                option === 1 ? 'price' : 'price-DESC'
            );

            if (url !== decodeURIComponent(origUrl)) {
                const to = removeQueryParam(url, 'page');
                history.push(to);
                window.location.reload();
            }
        } else {
            const url = removeQueryParam(origUrl, 'orderBy');
            if (decodeURIComponent(url) !== decodeURIComponent(origUrl)) {
                const to = removeQueryParam(url, 'page');
                history.push(to);
                window.location.reload();
            }
        }
    };

    const handlePageChange = async (pageNumber: number): Promise<void> => {
        setLoadingContent(true);

        const location = history.location;
        const origUrl = location.pathname + location.search;
        const url = insertParamInQuery(origUrl, 'page', pageNumber);

        if (page !== pageNumber) {
            history.push(url);
            setPage(pageNumber);
            const response: ManyProductProxy = await getProducts(
                pageNumber,
                0,
                itemsPerPage
            );
            setProducts(response.data);
        }

        setLoadingContent(false);
    };

    return (
        <Container>
            <Header />
            <Content>
                <InfoContainer>
                    <TitleContainer>
                        <Title>{title}</Title>
                        <TotalMatches>{totalMatches} resultados</TotalMatches>
                    </TitleContainer>
                    {categories && (
                        <TopicsContainer>
                            <span className="topic-title">Categorias</span>
                            {categories.map((category) => (
                                <Topic
                                    key={category.id}
                                    onClick={() =>
                                        handleCategoryClick(category)
                                    }
                                >
                                    {category.name}
                                </Topic>
                            ))}
                            <Topic
                                onClick={console.log}
                                style={{
                                    color:
                                        theme.colors.defaultHighlightGreyBlue,
                                    fontSize: '0.8rem',
                                    fontWeight: 400
                                }}
                            >
                                Ver todas
                            </Topic>
                        </TopicsContainer>
                    )}
                    {brStates && (
                        <TopicsContainer>
                            <span className="topic-title">Localização</span>
                            {brStates.map((state, index) => (
                                <Topic
                                    key={index}
                                    onClick={() => handleLocalClick(state[0])}
                                >
                                    {state[1]}
                                </Topic>
                            ))}
                            <Topic
                                onClick={console.log}
                                style={{
                                    color:
                                        theme.colors.defaultHighlightGreyBlue,
                                    fontSize: '0.8rem',
                                    fontWeight: 400
                                }}
                            >
                                Ver todas
                            </Topic>
                        </TopicsContainer>
                    )}
                    <TopicsContainer>
                        <span className="topic-title">Pagamento</span>
                        <Topic onClick={handleInterestFree}>Sem juros</Topic>
                    </TopicsContainer>
                    <TopicsContainer>
                        <span className="topic-title">Preço</span>
                        <Topic onClick={() => handlePriceFilterClick('', '30')}>
                            Até R$ 30,00
                        </Topic>
                        <Topic
                            onClick={() => handlePriceFilterClick('30', '60')}
                        >
                            De R$ 30,00 até R$ 60,00
                        </Topic>
                        <Topic onClick={() => handlePriceFilterClick('60', '')}>
                            Mais de R$ 60,00
                        </Topic>
                        <PriceRangeContainer>
                            <PriceFieldContainer>
                                <PriceField
                                    value={minPrice}
                                    maxLength={5}
                                    onChange={(event) =>
                                        changePrice(event.target.value, 'min')
                                    }
                                    required
                                />
                                <PriceFieldLabel>Mínimo</PriceFieldLabel>
                            </PriceFieldContainer>
                            <Divider />
                            <PriceFieldContainer>
                                <PriceField
                                    value={maxPrice}
                                    maxLength={5}
                                    onChange={(event) =>
                                        changePrice(event.target.value, 'max')
                                    }
                                    required
                                />
                                <PriceFieldLabel>Máximo</PriceFieldLabel>
                            </PriceFieldContainer>
                            <PriceButton
                                disabled={
                                    parseFloat(maxPrice) <
                                        parseFloat(minPrice) &&
                                    !(minPrice === '' && maxPrice === '')
                                }
                                onClick={() =>
                                    handlePriceFilterClick(minPrice, maxPrice)
                                }
                            >
                                Ok
                            </PriceButton>
                        </PriceRangeContainer>
                    </TopicsContainer>
                </InfoContainer>
                <ListContainer>
                    {sortBy && (
                        <SortByDropdown
                            style={{ position: 'absolute', right: 0, top: -60 }}
                            options={sortOptions}
                            defaultOption={sortBy}
                            onChange={handleSortClick}
                        />
                    )}
                    {!isLoadingContent && products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={console.log}
                                rating={4}
                            />
                        ))
                    ) : (
                        <ResultNotFound>
                            Nenhum resultado encontrado!
                        </ResultNotFound>
                    )}
                    {pageAmount > 1 && (
                        <Paginator
                            page={page}
                            pageAmount={pageAmount}
                            onPageChange={handlePageChange}
                            style={{
                                position: 'absolute',
                                bottom: -70,
                                left: '50%',
                                transform: 'translateX(-50%)'
                            }}
                        />
                    )}
                </ListContainer>
            </Content>
        </Container>
    );
};

export default Search;
