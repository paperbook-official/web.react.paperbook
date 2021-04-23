import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { CookiesEnum } from '../../../models/enums/cookies';
import { CreateAddressPayload } from '../../../models/payloads/address/createAddressPayload';
import { UpdateAddressPayload } from '../../../models/payloads/address/updateAddressPayload';
import { AddressProxy } from '../../../models/proxies/address/address';
import { UserProxy } from '../../../models/proxies/user/user';

import { setCookie } from '../../../services/cookies';

import { useCart } from '../../../hooks/useCart';
import { useCookies } from '../../../hooks/useCookies';
import { useShipping } from '../../../hooks/useShipping';
import { useUser } from '../../../hooks/useUser';

import AddressCard from '../../../components/atoms/AddressCard';
import LoadingDots from '../../../components/atoms/LoadingDots';
import Modal from '../../../components/atoms/Modal';
import TextField from '../../../components/molecules/TextField';
import Footer from '../../../components/organisms/Footer';
import Header from '../../../components/organisms/Header';
import ShippingCard from '../../../components/organisms/ShippingCard';

import {
    cpfValidation,
    nameValidation,
    numberValidation,
    phoneValidation
} from '../../../utils/validations';

import {
    ActionButton,
    ActionsContainer,
    AddressesContainer,
    Container,
    Content,
    FieldsContainer,
    IdentificationContainer,
    Title
} from './styles';

const Identification: React.FC = (): JSX.Element => {
    const history = useHistory();
    const { isCookiesAccepted } = useCookies();
    const {
        me,
        setMe,
        setSelectedAddress,
        updateUser,
        createUserAddress,
        getUserAddresses,
        updateUserAddress,
        deleteUserAddress
    } = useUser();
    const { address, getAddress, setAddress, options, setCep } = useShipping();
    const { localCart } = useCart();

    const [isLogged, setLogged] = useState(false);
    const [user, setUser] = useState<UserProxy>();
    const [
        currentAddress,
        setCurrentAddress
    ] = useState<CreateAddressPayload>();
    const [isShippingCardVisible, setShippingCardVisible] = useState(false);
    const [isLoadingData, setLoadingData] = useState(false);

    const initialState = async (): Promise<void> => {
        if (me) {
            const addressResponse = await getUserAddresses();
            setUser({ ...me, addresses: addressResponse });
            setMe({ ...me, addresses: addressResponse });

            setLoadingData(false);
        }
    };

    const loadCurrentAddress = (): void => {
        if (address && me) {
            setCurrentAddress({
                cep: address.cep.replace('-', ''),
                city: address.localidade,
                state: address.uf,
                district: address.bairro,
                street: address.logradouro,
                complement: address.complemento,
                houseNumber: 0,
                userId: me.id
            });

            setLoadingData(false);
        }
    };

    useEffect(() => {
        if (!localCart) history.push('/cart');
        setLoadingData(true);
        loadCurrentAddress();
    }, []);

    useEffect(() => {
        if (!isLogged && me) {
            setLogged(true);
            initialState();
        } else {
            if (!currentAddress) {
                setLoadingData(false);
                loadCurrentAddress();
            } else {
                setLoadingData(false);
            }
        }
    }, [me]);

    useEffect(() => {
        if (!currentAddress) {
            setLoadingData(true);
            loadCurrentAddress();
        }
    }, [address]);

    const handleContinueClick = async (): Promise<void> => {
        const addresses = me?.addresses;
        if (me && addresses) {
            if (currentAddress) {
                const filteredAddress = addresses.filter(
                    (ads) => ads.cep === currentAddress.cep
                );

                if (filteredAddress.length > 0) {
                    updateUserAddress(
                        currentAddress as UpdateAddressPayload,
                        filteredAddress[0].id
                    );
                    setSelectedAddress(filteredAddress[0].id);
                } else {
                    const response = await createUserAddress(currentAddress);
                    setSelectedAddress(response.id);
                }

                if (user) {
                    const userPayload = {
                        name: user.name,
                        lastName: user.lastName,
                        cpf: user.cpf,
                        phone: user.phone
                    };
                    updateUser(userPayload, me.id);
                }

                history.push('/payment');
            }
        }
    };

    const handleDeleteAddress = (ads: AddressProxy): void => {
        deleteUserAddress(ads.id);

        if (me && me.addresses && user) {
            const addressList = [...me.addresses];
            const addressIndex = addressList.indexOf(ads);
            if (addressIndex !== -1) {
                addressList.splice(addressIndex, 1);

                setMe({ ...me, addresses: addressList });
                setUser({ ...user, addresses: addressList });
            }
        }
    };

    const handleUseAddressClick = async (ads: AddressProxy): Promise<void> => {
        if (currentAddress && address) {
            if (ads.cep === address.cep.replace('-', '')) {
                setCurrentAddress({
                    ...currentAddress,
                    complement: ads.complement,
                    houseNumber: ads.houseNumber
                });
            } else {
                setCurrentAddress({ ...ads });
                setShippingCardVisible(true);

                const addressRes = await getAddress(ads.cep);
                setCep(ads.cep);
                if (isCookiesAccepted)
                    setCookie(CookiesEnum.CEP, ads.cep, '/', 30);
                setAddress(addressRes);
            }
        }
    };

    const isUserValid = (): boolean => {
        return (
            !!user &&
            nameValidation(user.name) &&
            nameValidation(user.lastName) &&
            cpfValidation(user.cpf || '') &&
            phoneValidation(user.phone || '') &&
            !!currentAddress &&
            numberValidation(currentAddress.houseNumber.toString())
        );
    };

    const getCpfMask = (): string | undefined => {
        if (user) {
            const len = user.cpf ? user.cpf.length : 0;
            if (len < 4) {
                return '###';
            } else if (len < 7) {
                return '###.###';
            } else if (len < 10) {
                return '###.###.###';
            } else {
                return '###.###.###-##';
            }
        }

        return undefined;
    };

    const getPhoneMask = (): string | undefined => {
        if (user) {
            const len = user.phone ? user.phone.length : 0;
            if (len < 3) {
                return '##';
            } else if (len < 7) {
                return '(##) ####';
            } else if (len < 11) {
                return '(##) ####-####';
            } else {
                return '(##) #####-####';
            }
        }

        return undefined;
    };

    return (
        <Container>
            <Header isSecondary />
            <Content>
                <Title>Identificação do cliente</Title>
                <div className="divider"></div>
                {isLoadingData ? (
                    <div className="loading-container">
                        <LoadingDots />
                    </div>
                ) : (
                    <IdentificationContainer>
                        <FieldsContainer>
                            <h3>Dados pessoais</h3>
                            <div className="row-container">
                                <TextField
                                    value={user?.name || ''}
                                    label="Nome"
                                    name="name"
                                    onTextChange={(text: string) =>
                                        user && setUser({ ...user, name: text })
                                    }
                                    type="text"
                                    errorMessage="Campo obrigatório!"
                                    validation={nameValidation}
                                    style={{ width: '47%' }}
                                />
                                <TextField
                                    value={user?.lastName || ''}
                                    label="Sobrenome"
                                    name="lastName"
                                    onTextChange={(text: string) =>
                                        user &&
                                        setUser({ ...user, lastName: text })
                                    }
                                    type="text"
                                    errorMessage="Campo obrigatório!"
                                    validation={nameValidation}
                                    style={{ width: '47%' }}
                                />
                            </div>
                            <div className="row-container">
                                <TextField
                                    value={user?.email || ''}
                                    label="E-mail"
                                    name="email"
                                    type="text"
                                    isDisabled
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="row-container">
                                <TextField
                                    value={user?.cpf || ''}
                                    label="CPF"
                                    name="cpf"
                                    onTextChange={(text: string) =>
                                        user && setUser({ ...user, cpf: text })
                                    }
                                    type="text"
                                    mask={getCpfMask()}
                                    errorMessage="CPF inválido!"
                                    validation={cpfValidation}
                                    length={14}
                                    style={{ width: '47%' }}
                                />
                                <TextField
                                    value={user?.phone || ''}
                                    label="Telefone"
                                    name="phone"
                                    onTextChange={(text: string) =>
                                        user &&
                                        setUser({ ...user, phone: text })
                                    }
                                    type="text"
                                    mask={getPhoneMask()}
                                    errorMessage="Telefone  inválido!"
                                    validation={phoneValidation}
                                    length={15}
                                    style={{ width: '47%' }}
                                />
                            </div>
                            <div className="row-container">
                                <TextField
                                    value={currentAddress?.street || ''}
                                    label="Logradouro"
                                    name="address"
                                    type="text"
                                    isDisabled
                                    style={{ width: '47%' }}
                                />
                                <TextField
                                    value={
                                        currentAddress?.houseNumber
                                            ? currentAddress?.houseNumber.toString()
                                            : ''
                                    }
                                    label="Número"
                                    name="houseNumber"
                                    onTextChange={(text: string) =>
                                        currentAddress &&
                                        setCurrentAddress({
                                            ...currentAddress,
                                            houseNumber: numberValidation(text)
                                                ? parseInt(text)
                                                : 0
                                        })
                                    }
                                    type="text"
                                    errorMessage="Número inválido!"
                                    validation={numberValidation}
                                    style={{ width: '47%' }}
                                />
                            </div>
                            <div className="row-container">
                                <TextField
                                    value={currentAddress?.complement || ''}
                                    label="Complemento"
                                    name="complement"
                                    onTextChange={(text: string) =>
                                        currentAddress &&
                                        setCurrentAddress({
                                            ...currentAddress,
                                            complement: text
                                        })
                                    }
                                    type="text"
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="row-container">
                                <TextField
                                    value={currentAddress?.district || ''}
                                    label="Bairro"
                                    name="district"
                                    type="text"
                                    isDisabled
                                    style={{ width: '30%' }}
                                />
                                <TextField
                                    value={currentAddress?.state || ''}
                                    label="Estado"
                                    name="state"
                                    type="text"
                                    isDisabled
                                    style={{ width: '30%' }}
                                />
                                <TextField
                                    value={currentAddress?.city || ''}
                                    label="Cidade"
                                    name="city"
                                    type="text"
                                    isDisabled
                                    style={{ width: '30%' }}
                                />
                            </div>
                            <ActionsContainer>
                                <ActionButton
                                    className="secondary"
                                    onClick={() => history.push('/cart')}
                                >
                                    Voltar
                                </ActionButton>
                                <ActionButton
                                    className={!isUserValid() ? 'disabled' : ''}
                                    disabled={!isUserValid()}
                                    onClick={handleContinueClick}
                                >
                                    Continuar
                                </ActionButton>
                            </ActionsContainer>
                        </FieldsContainer>
                        {me && me.addresses && me.addresses.length > 0 && (
                            <AddressesContainer>
                                <div className="vertical-divider"></div>
                                <h2>Endereços salvos</h2>
                                {me.addresses.map((address) => (
                                    <AddressCard
                                        key={address.id}
                                        user={me}
                                        address={address}
                                        onUseAddressClick={
                                            handleUseAddressClick
                                        }
                                        onDeleteClick={handleDeleteAddress}
                                    />
                                ))}
                            </AddressesContainer>
                        )}
                    </IdentificationContainer>
                )}
            </Content>
            <Footer />
            {isShippingCardVisible && (
                <Modal>
                    <ShippingCard
                        options={options}
                        showOnlyOptions={true}
                        onClose={() => {
                            setShippingCardVisible(false);
                        }}
                    />
                </Modal>
            )}
        </Container>
    );
};

export default Identification;
