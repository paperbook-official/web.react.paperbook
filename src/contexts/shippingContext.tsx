import React, { createContext, useEffect, useState } from 'react';

import { CookiesEnum } from '../models/enums/cookies';
import { CEPProxy } from '../models/proxies/address';

import api from '../services/api';
import { getCookie } from '../services/cookies';

import { useCookies } from '../hooks/useCookies';

export interface ShippingOptionData {
    id: number;
    name: string;
    daysToArrive: number;
    price: number;
}

export interface ShippingContextData {
    cep?: string;
    setCep(value: string): void;
    option?: ShippingOptionData;
    setOption(option: ShippingOptionData): void;
    getAddress(cep: string): Promise<CEPProxy>;
    address?: CEPProxy;
    setAddress(address?: CEPProxy): void;
}

interface ShippingProviderProps {
    children: JSX.Element;
}

export const ShippingContext = createContext<ShippingContextData>(
    {} as ShippingContextData
);

export const ShippingProvider: React.FC<ShippingProviderProps> = ({
    children
}: ShippingProviderProps) => {
    const { isCookiesAccepted } = useCookies();

    const [cep, setCep] = useState(
        isCookiesAccepted ? getCookie(CookiesEnum.CEP) : ''
    );
    const [option, setOption] = useState<ShippingOptionData>();
    const [address, setAddress] = useState<CEPProxy>();

    const getAddress = async (cepText: string): Promise<CEPProxy> => {
        const cepUrl = `https://viacep.com.br/ws/${cepText}/json/`;
        const response = await api.get<CEPProxy>(cepUrl);
        const data = response.data;
        return data;
    };

    useEffect(() => {
        if (cep) {
            getAddress(cep).then(setAddress);
        }
    }, []);

    return (
        //#region JSX

        <ShippingContext.Provider
            value={{
                cep,
                setCep,
                option,
                setOption,
                getAddress,
                address,
                setAddress
            }}
        >
            {children}
        </ShippingContext.Provider>

        //#endregion
    );
};

export default ShippingProvider;
