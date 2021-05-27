import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { RolesEnum } from '../../models/enums/user';
import { ProductProxy } from '../../models/proxies/product/product';

import { useLoading } from '../../hooks/useLoading';
import { useProduct } from '../../hooks/useProduct';
import useQuery from '../../hooks/useQuery';
import { useUser } from '../../hooks/useUser';

import FloatButton from '../../components/atoms/FloatButton';
import Modal from '../../components/atoms/Modal';
import Paginator from '../../components/atoms/Paginator';
import Footer from '../../components/organisms/Footer';
import Header from '../../components/organisms/Header';
import ProductCard from '../../components/organisms/ProductCard';
import ProductCreation from '../../components/organisms/ProductCreation';

import { insertParamInQuery } from '../../utils/formatters';

import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';

import { Container, Content, ListContainer, ResultNotFound } from './styles';

const itemsPerPage = 60;

const UserProducts: React.FC = () => {
    const history = useHistory();
    const query = useQuery();
    const { me } = useUser();
    const { getUserProducts } = useProduct();
    const { isLoadingContent, setLoadingContent } = useLoading();

    const [isModalVisible, setModalVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    const [editingProduct, setEditingProduct] = useState<ProductProxy>();
    const [products, setProducts] = useState<ProductProxy[]>([]);

    const [totalMatches, setTotalMatches] = useState<number>();
    const [pageAmount, setPageAmount] = useState(0);
    const [page, setPage] = useState(1);

    const getCurrentUrl = (): string => {
        return history.location.pathname + history.location.search;
    };

    const initialState = async (): Promise<void> => {
        setLoadingContent(true);

        const queryPage = parseInt(query.get('page') || '1');

        const response = await getUserProducts(queryPage, itemsPerPage);

        if (response) {
            setProducts(response.data);
            setTotalMatches(response.total);
            setPageAmount(response.pageCount);
        }

        setLoadingContent(false);
    };

    useEffect(() => {
        if (me?.permissions === RolesEnum.COMMON) history.push('/');
        else if (me) {
            setHasLoaded(true);
            initialState();
        }
    }, []);

    useEffect(() => {
        if (!hasLoaded) initialState();
    }, [me]);

    const handlePageChange = async (pageNumber: number): Promise<void> => {
        setLoadingContent(true);

        const origUrl = getCurrentUrl();
        const url = insertParamInQuery(origUrl, 'page', pageNumber);

        if (page !== pageNumber) {
            history.push(url);
            setPage(pageNumber);
            window.scrollTo(0, 0);

            const response = await getUserProducts(pageNumber, itemsPerPage);
            if (response) setProducts(response.data);
        }

        setLoadingContent(false);
    };

    const getProductRating = (product: ProductProxy): number => {
        if (product.ratings) {
            const stars = product.ratings.map((rating) => rating.stars || 0);
            const average = stars.reduce((a, b) => a + b, 0);
            return average || 0;
        }
        return 0;
    };

    const onProductCreationComplete = async (
        product: ProductProxy
    ): Promise<void> => {
        setModalVisible(false);

        if (me) {
            if (editingProduct) {
                const productsList = [...products];

                productsList.forEach((p, index) => {
                    if (p.id === product.id) {
                        productsList[index] = { ...product, user: me };
                    }
                });

                setProducts(productsList);
            } else {
                setTotalMatches((totalMatches || 0) + 1);
                setProducts([{ ...product, user: me }, ...products]);
            }
        }
    };

    return (
        <Container>
            <Header />
            <Content>
                <div className="title-container">
                    <h1 className="title">Seus anúncios</h1>
                    <span className="total-matches">
                        {totalMatches || 0} produtos anunciados
                    </span>
                </div>
                <ListContainer
                    style={{
                        display:
                            !isLoadingContent && totalMatches === 0
                                ? 'flex'
                                : 'grid'
                    }}
                >
                    {!isLoadingContent && products.length > 0
                        ? products.map((product) => (
                              <ProductCard
                                  style={{
                                      width:
                                          (window.innerWidth <= 1100 &&
                                              window.innerWidth > 845) ||
                                          window.innerWidth <= 665 ||
                                          (window.innerWidth > 1200 &&
                                              window.innerWidth <= 1366)
                                              ? 255
                                              : 300
                                  }}
                                  key={product.id}
                                  product={product}
                                  onClick={(p) => {
                                      setEditingProduct(p);
                                      setModalVisible(true);
                                  }}
                                  rating={getProductRating(product)}
                              />
                          ))
                        : !isLoadingContent &&
                          totalMatches === 0 && (
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
            <FloatButton
                Icon={PlusIcon}
                onClick={() => {
                    setEditingProduct(undefined);
                    setModalVisible(true);
                }}
                text="Adicionar produto"
                iconSize={30}
            />
            {isModalVisible && (
                <Modal onClickOutside={() => setModalVisible(false)}>
                    <ProductCreation
                        product={editingProduct}
                        onComplete={(product: ProductProxy) =>
                            onProductCreationComplete(product)
                        }
                    />
                </Modal>
            )}
        </Container>
    );
};

export default UserProducts;
