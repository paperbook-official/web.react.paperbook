import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ActionResultEnum } from '../../models/enums/actionResultTypes';
import { GetMany } from '../../models/getMany';
import { OrderProxy } from '../../models/proxies/order/order';
import { ProductProxy } from '../../models/proxies/product/product';

import { useActionResult } from '../../hooks/useActionResult';
import { useAuth } from '../../hooks/useAuth';
import { useLoading } from '../../hooks/useLoading';
import { useOrder } from '../../hooks/useOrder';
import { useProduct } from '../../hooks/useProduct';
import useQuery from '../../hooks/useQuery';
import { useShipping } from '../../hooks/useShipping';
import { useUser } from '../../hooks/useUser';

import LoadingDots from '../../components/atoms/LoadingDots';
import Modal from '../../components/atoms/Modal';
import Paginator from '../../components/atoms/Paginator';
import Rating from '../../components/atoms/Rating';
import Footer from '../../components/organisms/Footer';
import Header from '../../components/organisms/Header';
import OrderCard from '../../components/organisms/OrderCard';

import { insertParamInQuery, removeQueryParam } from '../../utils/formatters';

import {
    CepButton,
    CepContainer,
    CepInput,
    CepInputContainer,
    CepInputLabel,
    Container,
    Content,
    InfoContainer,
    ListContainer,
    RateButton,
    RateContainer,
    RateSelectContainer,
    RateTextContainer,
    ResultNotFound,
    Title,
    TitleContainer,
    Topic,
    TopicsContainer,
    TotalMatches
} from './styles';

interface SearchOrdersProps {
    page?: number;
    offset?: number;
    itemsPerPage?: number;
    filter?: string[];
    join?: string[];
    cep?: string;
    status?: string;
}

const Orders: React.FC = (): JSX.Element => {
    const history = useHistory();
    const query = useQuery();
    const { isLoadingContent, setLoadingContent } = useLoading();
    const { token } = useAuth();
    const { me } = useUser();
    const { cep } = useShipping();
    const { getOrders } = useOrder();
    const {
        createProductRating,
        getUserProductRating,
        updateProductRating
    } = useProduct();
    const { show } = useActionResult();

    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalLoading, setModalLoading] = useState(false);
    const [searchCep, setSearchCep] = useState('');
    const [ratingProduct, setRatingProduct] = useState<ProductProxy>();
    const [rating, setRating] = useState(0);
    const [rateText, setRateText] = useState('');
    const [userRating, setUserRating] = useState(-1);

    const [orders, setOrders] = useState<OrderProxy[]>([]);

    const [page, setPage] = useState(1);
    const [pageAmount, setPageAmount] = useState(0);
    const [totalMatches, setTotalMatches] = useState(0);

    const itemsPerPage = 10;

    const getCurrentUrl = (): string => {
        return history.location.pathname + history.location.search;
    };

    const searchOrders = async (
        searchParams?: SearchOrdersProps
    ): Promise<GetMany<OrderProxy>> => {
        const getParam = (queryParam: string, text?: string): string => {
            let param = text;
            if (!(param || param === '')) {
                param = query.get(queryParam) || '';
            }
            return param;
        };

        const queryCep = getParam('cep', searchParams?.cep);
        const status = getParam('status', searchParams?.status);
        const queryPage = query.get('page');

        const filter: string[] = [];

        if (queryCep) filter.push(`cep||$eq||${queryCep}`);
        if (status) filter.push(`status||$eq||${status}`);

        const response = await getOrders(
            searchParams?.page || parseInt(queryPage || '1'),
            searchParams?.offset || 0,
            searchParams?.itemsPerPage || itemsPerPage,
            searchParams?.filter || filter,
            searchParams?.join
        );

        setOrders(response.data);
        setTotalMatches(response.total);
        setPageAmount(response.pageCount);

        return response;
    };

    const initialState = async (): Promise<void> => {
        setLoadingContent(true);

        await searchOrders();

        setLoadingContent(false);
    };

    useEffect(() => {
        if (token) initialState();
    }, []);

    useEffect(() => {
        if (token) initialState();
    }, [token]);

    const handlePageChange = async (pageNumber: number): Promise<void> => {
        setLoadingContent(true);

        const url = insertParamInQuery(getCurrentUrl(), 'page', pageNumber);

        if (page !== pageNumber) {
            history.push(url);
            setPage(pageNumber);
            window.scrollTo(0, 0);

            await searchOrders({
                page: pageNumber
            });
        }

        setLoadingContent(false);
    };

    const filterBy = async (
        name: string,
        value: string | number
    ): Promise<void> => {
        const url = insertParamInQuery(getCurrentUrl(), name, value);

        if (decodeURIComponent(url) !== decodeURIComponent(getCurrentUrl())) {
            const to = removeQueryParam(url, 'page');
            history.push(to);

            await searchOrders({
                [name]: value.toString()
            });
        }
    };

    const onRateClick = async (product: ProductProxy): Promise<void> => {
        setModalLoading(true);

        setRatingProduct(product);
        setModalVisible(true);

        if (me) {
            const ratingResponse = await getUserProductRating(
                me.id,
                product.id
            );
            if (ratingResponse && ratingResponse.length > 0) {
                setUserRating(ratingResponse[0].id);
                setRating(ratingResponse[0].stars || 0);
                setRateText(ratingResponse[0].text || '');
            }
        }

        setModalLoading(false);
    };

    const getActiveClass = (topicNumber: number): string => {
        const queryStatus = parseInt(query.get('status') || '');
        return queryStatus === topicNumber ? 'active' : '';
    };

    const saveRating = async (): Promise<void> => {
        if (ratingProduct && me) {
            try {
                setLoadingContent(true);

                if (userRating !== -1) {
                    await updateProductRating(userRating, {
                        stars: rating,
                        text: rateText
                    });
                } else {
                    await createProductRating({
                        stars: rating,
                        text: rateText,
                        userId: me.id,
                        productId: ratingProduct.id
                    });
                }

                setModalVisible(false);
                setLoadingContent(false);

                show(
                    'Produto avaliado!',
                    ratingProduct.name,
                    ActionResultEnum.SUCCESS
                );
            } catch (error) {
                show(
                    'Erro ao avaliar!',
                    ratingProduct.name,
                    ActionResultEnum.ERROR
                );
            }
        }
    };

    return (
        <Container>
            <Header />
            <Content>
                <InfoContainer>
                    <TopicsContainer>
                        <span className="topic-title">Status</span>
                        <Topic
                            onClick={() => filterBy('status', 0)}
                            className={getActiveClass(0)}
                        >
                            Pendente
                        </Topic>
                        <Topic
                            onClick={() => filterBy('status', 1)}
                            className={getActiveClass(1)}
                        >
                            Entregue
                        </Topic>
                        <Topic
                            onClick={() => filterBy('status', 2)}
                            className={getActiveClass(2)}
                        >
                            Cancelado
                        </Topic>
                    </TopicsContainer>
                    <TopicsContainer>
                        <span className="topic-title">Entrega</span>
                        {cep && (
                            <Topic
                                onClick={() => filterBy('cep', cep)}
                                className={
                                    query.get('cep') === cep ? 'active' : ''
                                }
                            >
                                Meu CEP
                            </Topic>
                        )}
                        <CepContainer>
                            <CepInputContainer>
                                <CepInput
                                    value={searchCep}
                                    onChange={(event) => {
                                        if (
                                            /^[0-9]{0,8}$/g.test(
                                                event.target.value
                                            )
                                        )
                                            setSearchCep(event.target.value);
                                    }}
                                    type="text"
                                    maxLength={8}
                                    required
                                />
                                <CepInputLabel>
                                    {cep || '00000000'}
                                </CepInputLabel>
                            </CepInputContainer>
                            <CepButton
                                onClick={() =>
                                    searchCep && filterBy('cep', searchCep)
                                }
                            >
                                Ok
                            </CepButton>
                        </CepContainer>
                    </TopicsContainer>
                </InfoContainer>
                <ListContainer>
                    <TitleContainer>
                        <Title>Histório de pedidos</Title>
                        <TotalMatches>
                            {totalMatches} pedidos realizados
                        </TotalMatches>
                    </TitleContainer>
                    {!isLoadingContent && orders.length > 0
                        ? orders.map((order) => (
                              <OrderCard
                                  key={order.id}
                                  order={order}
                                  onRateClick={onRateClick}
                              />
                          ))
                        : !isLoadingContent && (
                              <ResultNotFound>
                                  Nenhum pedido realizado!
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
                <Modal
                    onClickOutside={() => {
                        setRating(0);
                        setRateText('');
                        setModalVisible(false);
                        setUserRating(-1);
                    }}
                >
                    {!isModalLoading ? (
                        <RateContainer>
                            <h1 className="rate-title">Avaliar</h1>
                            <RateSelectContainer>
                                <h1 className="rate-select-title">
                                    Dê sua nota
                                </h1>
                                <Rating
                                    rating={rating}
                                    select
                                    onSelect={(rating: number) =>
                                        setRating(rating)
                                    }
                                />
                            </RateSelectContainer>
                            <RateTextContainer>
                                <h1 className="rate-text-title">
                                    Comente sobre o produto
                                </h1>
                                <textarea
                                    value={rateText}
                                    onChange={(event) =>
                                        setRateText(event.target.value)
                                    }
                                    maxLength={200}
                                ></textarea>
                            </RateTextContainer>
                            <RateButton
                                onClick={saveRating}
                                className={!rateText ? 'disabled' : ''}
                            >
                                Salvar
                            </RateButton>
                        </RateContainer>
                    ) : (
                        <RateContainer className="loading">
                            <LoadingDots />
                        </RateContainer>
                    )}
                </Modal>
            )}
        </Container>
    );
};

export default Orders;
