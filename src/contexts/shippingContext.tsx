import React, { createContext, useEffect, useState } from 'react';

import { CookiesEnum } from '../models/enums/cookies';
import { CEPProxy } from '../models/proxies/cep/cep';

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
    getArriveDate(daysToArrive: number, price: number): string;
}

interface ShippingProviderProps {
    children: JSX.Element;
}

export const ShippingContext = createContext<ShippingContextData>(
    {} as ShippingContextData
);

const days = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado'
];

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

    const getArriveDate = (daysToArrive: number, price: number): string => {
        const date = new Date();
        date.setDate(date.getDate() + daysToArrive);

        const localDate = date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        const prefix = price === 0 ? 'grátis ' : '';

        const arriveDay = date.getDay();

        if (daysToArrive === 0) return prefix + 'hoje';
        if (daysToArrive === 1) return prefix + 'amanhã';
        if (daysToArrive <= 7)
            return (
                (price === 0 ? prefix : `${days[arriveDay]}, `) +
                `${localDate.split('/')[0]}/${localDate.split('/')[1]}`
            );
        return `${prefix}${localDate.split('/')[0]}/${localDate.split('/')[1]}`;
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
                setAddress,
                getArriveDate
            }}
        >
            {children}
        </ShippingContext.Provider>

        //#endregion
    );
};

export default ShippingProvider;
