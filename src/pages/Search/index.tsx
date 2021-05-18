import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { BrStatesEnum } from '../../models/enums/brStates';
import { GetMany } from '../../models/getMany';
import { CategoryProxy } from '../../models/proxies/category/category';
import { ProductProxy } from '../../models/proxies/product/product';

import { useCategory } from '../../hooks/useCategory';
import { useLoading } from '../../hooks/useLoading';
import { useProduct } from '../../hooks/useProduct';
import useQuery from '../../hooks/useQuery';

import LoadingDots from '../../components/atoms/LoadingDots';
import Modal from '../../components/atoms/Modal';
import Paginator from '../../components/atoms/Paginator';
import SortByDropdown from '../../components/atoms/SortByDropdown';
import Footer from '../../components/organisms/Footer';
import Header from '../../components/organisms/Header';
import ProductCard from '../../components/organisms/ProductCard';
import ProductCardRow from '../../components/organisms/ProductCardRow';
import { useTheme } from 'styled-components';

import {
    formatQueryToCommon,
    insertParamInQuery,
    removeQueryParam
} from '../../utils/formatters';

import { ReactComponent as GridIcon } from '../../assets/icons/grid.svg';
import { ReactComponent as ListIcon } from '../../assets/icons/list.svg';

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
    TotalMatches,
    SwitchIcon,
    ModalCard
} from './styles';

interface GenericObject {
    id: string | number;
    name: string;
}

const sortOptions = ['Mais Relevantes', 'Menor Preço', 'Maior Preço'];
const itemsPerPage = 5;

const Search: React.FC = (): JSX.Element => {
    const query = useQuery();
    const history = useHistory();
    const theme = useTheme();
    const { searchProducts } = useProduct();
    const { isLoadingContent, setLoadingContent } = useLoading();
    const { getCategories } = useCategory();

    const [title, setTitle] = useState('');
    const [totalMatches, setTotalMatches] = useState(0);
    const [products, setProducts] = useState<ProductProxy[]>([]);
    const [categories, setCategories] = useState<CategoryProxy[]>([]);
    const [allCategories, setAllCategories] = useState<CategoryProxy[]>([]);
    const [brStates, setBrStates] = useState<string[][]>();
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState<number>();

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<GenericObject[]>([]);
    const [isLoadingModal, setLoadingModal] = useState(false);

    const [page, setPage] = useState(1);
    const [pageAmount, setPageAmount] = useState(0);
    const [displayType, setDisplayType] = useState('G');

    const getCurrentUrl = (): string => {
        return history.location.pathname + history.location.search;
    };

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

    const setQueryParam = (
        param: string,
        defaultValue: string | number
    ): string | number => {
        const queryParam = query.get(param);
        if (queryParam) {
            if (param === 'page') setPage(parseInt(queryParam));
            else setDisplayType(queryParam);
        } else {
            const origUrl = getCurrentUrl();
            const url = insertParamInQuery(origUrl, param, defaultValue);
            history.push(url);
        }
        if (typeof defaultValue === 'number') {
            return parseInt(queryParam || `${defaultValue}`);
        } else {
            return queryParam || defaultValue;
        }
    };

    const initialState = async (): Promise<void> => {
        setLoadingContent(true);

        const location = history.location.search;

        if (
            !location ||
            location === '' ||
            !(location.includes('search') || location.includes('category'))
        ) {
            history.push('/');
        } else {
            setQueryParam('displayType', 'G');
            const currentPage = setQueryParam('page', 1);

            const search = formatQueryToCommon(query.get('search') || ''),
                category = formatQueryToCommon(query.get('category') || ''),
                categoryId = query.get('catId'),
                state = query.get('state'),
                minPrice = query.get('minPrice'),
                maxPrice = query.get('maxPrice'),
                freeOfInterests = query.get('interestFree');

            const queryToCommon = search || category || '';
            setTitle(queryToCommon);

            const responseCat = await getCategories(9);
            setCategories(responseCat);
            getBrStates();

            const response = await searchProducts(
                currentPage as number,
                0,
                itemsPerPage,
                ['ratings'],
                [],
                search.toLowerCase(),
                categoryId || '',
                minPrice || '',
                maxPrice || '',
                state || '',
                freeOfInterests === 'true'
            );

            setTotalMatches(response.total);
            setPageAmount(Math.ceil(response.total / itemsPerPage));
            setProducts(response.data);

            const querySort = query.get('orderBy');
            if (querySort) {
                setSortBy(querySort.includes('DESC') ? 3 : 2);
            } else {
                setSortBy(1);
            }
        }

        setLoadingContent(false);
    };

    useEffect(() => {
        initialState();
    }, []);

    const handleCategoryClick = (category: CategoryProxy) => {
        const origUrl = getCurrentUrl();
        const url = insertParamInQuery(origUrl, 'category', category.name);
        const newUrl = insertParamInQuery(url, 'catId', category.id);

        if (decodeURIComponent(newUrl) !== decodeURIComponent(origUrl)) {
            const to = removeQueryParam(newUrl, 'page');
            history.push(to);
            window.location.reload();
        }
    };

    const handleLocalClick = (state: string) => {
        const origUrl = getCurrentUrl();
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
        const origUrl = getCurrentUrl();
        const url = insertParamInQuery(origUrl, 'interestFree', 'true');

        if (decodeURIComponent(url) !== decodeURIComponent(origUrl)) {
            const to = removeQueryParam(url, 'page');
            history.push(to);
            window.location.reload();
        }
    };

    const handlePriceFilterClick = (min: string, max: string): void => {
        const origUrl = getCurrentUrl();

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
        const origUrl = getCurrentUrl();

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

        const origUrl = getCurrentUrl();
        const url = insertParamInQuery(origUrl, 'page', pageNumber);

        if (page !== pageNumber) {
            history.push(url);
            setPage(pageNumber);
            window.scrollTo(0, 0);

            const search = formatQueryToCommon(query.get('search') || ''),
                categoryId = query.get('catId'),
                state = query.get('state'),
                minPrice = query.get('minPrice'),
                maxPrice = query.get('maxPrice'),
                freeOfInterests = query.get('interestFree');

            const response: GetMany<ProductProxy> = await searchProducts(
                pageNumber,
                0,
                itemsPerPage,
                ['ratings'],
                [],
                search.toLowerCase(),
                categoryId || '',
                minPrice || '',
                maxPrice || '',
                state || '',
                freeOfInterests === 'true'
            );
            setProducts(response.data);
        }

        setLoadingContent(false);
    };

    const handleDisplayChange = (type: string): void => {
        setDisplayType(type);
        const origUrl = getCurrentUrl();
        const url = insertParamInQuery(origUrl, 'displayType', type);

        if (decodeURIComponent(url) !== decodeURIComponent(origUrl)) {
            history.push(url);
        }
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

    const handleSeeAllStates = (): void => {
        setModalVisible(true);
        setLoadingModal(true);

        const states = [];

        for (const state in BrStatesEnum) {
            if (state && isState(state)) {
                states.push({ id: state, name: BrStatesEnum[state] });
            }
        }

        setModalContent(states);
        setLoadingModal(false);
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
        <Container style={{ overflow: isModalVisible ? 'hidden' : 'visible' }}>
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
                                    className={
                                        parseInt(query.get('catId') || '') ===
                                        category.id
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    {category.name}
                                </Topic>
                            ))}
                            <Topic
                                onClick={handleSeeAllCategories}
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
                                    className={
                                        (query.get('state') || '') === state[0]
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    {state[1]}
                                </Topic>
                            ))}
                            <Topic
                                onClick={handleSeeAllStates}
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
                        <Topic
                            onClick={handleInterestFree}
                            className={
                                query.get('interestFree') ? 'active' : ''
                            }
                        >
                            Sem juros
                        </Topic>
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
                <ListContainer
                    style={{
                        display:
                            (!isLoadingContent && totalMatches === 0) ||
                            displayType === 'L'
                                ? 'flex'
                                : 'grid'
                    }}
                    isListDisplay={displayType === 'L'}
                >
                    {sortBy && (
                        <SortByDropdown
                            style={{
                                position: 'absolute',
                                right: 100,
                                top: -60
                            }}
                            options={sortOptions}
                            defaultOption={sortBy}
                            onChange={handleSortClick}
                        />
                    )}
                    <SwitchIcon
                        className={`list ${
                            displayType === 'L' ? 'selected' : ''
                        }`}
                        onClick={() => handleDisplayChange('L')}
                    >
                        <ListIcon
                            height={20}
                            width={20}
                            color={
                                displayType === 'L'
                                    ? theme.colors.defaultBlue
                                    : theme.colors.defaultGrey
                            }
                        />
                    </SwitchIcon>
                    <SwitchIcon
                        className={`grid ${
                            displayType === 'G' ? 'selected' : ''
                        }`}
                        onClick={() => handleDisplayChange('G')}
                    >
                        <GridIcon
                            height={18}
                            width={18}
                            color={
                                displayType === 'G'
                                    ? theme.colors.defaultBlue
                                    : theme.colors.defaultGrey
                            }
                        />
                    </SwitchIcon>
                    {!isLoadingContent && products.length > 0
                        ? products.map((product, index) =>
                              displayType === 'G' ? (
                                  <ProductCard
                                      style={{
                                          width:
                                              window.innerWidth <= 1366
                                                  ? 255
                                                  : 300
                                      }}
                                      key={product.id}
                                      product={product}
                                      onClick={(product) =>
                                          history.push(
                                              `/products/${product.id}`
                                          )
                                      }
                                      rating={getProductRating(product)}
                                  />
                              ) : (
                                  <ProductCardRow
                                      style={{
                                          borderRadius:
                                              index === 0 &&
                                              products.length === 1
                                                  ? '5px 5px 5px 5px'
                                                  : index === 0
                                                  ? '5px 5px 0 0'
                                                  : index ===
                                                    products.length - 1
                                                  ? '0 0 5px 5px'
                                                  : ''
                                      }}
                                      key={product.id}
                                      product={product}
                                      onClick={(product) =>
                                          history.push(
                                              `/products/${product.id}`
                                          )
                                      }
                                      rating={getProductRating(product)}
                                  />
                              )
                          )
                        : !isLoadingContent && (
                              <ResultNotFound>
                                  Nenhum resultado encontrado!
                              </ResultNotFound>
                          )}
                    {!isLoadingContent && pageAmount > 1 && (
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
                                <h1>
                                    {typeof modalContent[0].id === 'number'
                                        ? 'Categorias'
                                        : 'Localização'}
                                </h1>
                                <div
                                    className="modal-content"
                                    style={{
                                        overflowY:
                                            modalContent.length === 12
                                                ? 'hidden'
                                                : 'scroll'
                                    }}
                                >
                                    {modalContent.map((content, index) => (
                                        <Topic
                                            key={
                                                typeof content.id === 'number'
                                                    ? content.id
                                                    : index
                                            }
                                            onClick={() =>
                                                typeof content.id === 'number'
                                                    ? handleCategoryClick(
                                                          content as CategoryProxy
                                                      )
                                                    : handleLocalClick(
                                                          content.id
                                                      )
                                            }
                                            className={
                                                parseInt(
                                                    query.get('catId') || ''
                                                ) === content.id ||
                                                query.get('state') ===
                                                    content.id
                                                    ? 'active'
                                                    : ''
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

export default Search;
