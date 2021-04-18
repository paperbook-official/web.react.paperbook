import React, { createContext, useState } from 'react';

import { CreateAddressPayload } from '../models/payloads/address/createAddressPayload';
import { UpdateAddressPayload } from '../models/payloads/address/updateAddressPayload';
import { UpdateUserPayload } from '../models/payloads/user/updateUser';
import { AddressProxy } from '../models/proxies/address/address';
import { UserProxy } from '../models/proxies/user/user';

import api from '../services/api';

import { useAuth } from '../hooks/useAuth';

export interface UserContextData {
    me: UserProxy | undefined;
    setMe(user: UserProxy): void;
    selectedAddress?: number;
    setSelectedAddress(addressId?: number): void;
    getUserProperties(properties: string[]): Promise<UserProxy>;
    updateUser(user: UpdateUserPayload, userId: number): Promise<void>;
    createUserAddress(address: CreateAddressPayload): Promise<AddressProxy>;
    getUserAddresses(): Promise<AddressProxy[]>;
    updateUserAddress(
        address: UpdateAddressPayload,
        addressId: number
    ): Promise<void>;
    deleteUserAddress(addressId: number): Promise<void>;
}

interface UserProviderProps {
    children: JSX.Element;
}

export const UserContext = createContext<UserContextData>(
    {} as UserContextData
);

export const UserProvider: React.FC<UserProviderProps> = ({
    children
}: UserProviderProps) => {
    const { token } = useAuth();

    const [me, setMe] = useState<UserProxy>();
    const [selectedAddress, setSelectedAddress] = useState<number>();

    const insertPropertiesInQuery = (
        query: string,
        properties: string[]
    ): string => {
        let newQuery = query;

        if (properties.length > 0) {
            properties.forEach((prop, index) => {
                if (index !== 0) {
                    newQuery += '&';
                }
                newQuery += 'join=' + prop;
            });
        }

        return newQuery;
    };

    const getUserProperties = async (
        properties: string[]
    ): Promise<UserProxy> => {
        const url = insertPropertiesInQuery(`/users/me?`, properties);
        const response = await api.get<UserProxy>(url, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const updateUser = async (
        user: UpdateUserPayload,
        userId: number
    ): Promise<void> => {
        await api.patch('/users/' + userId, user, {
            headers: { Authorization: 'Bearer ' + token }
        });
    };

    const createUserAddress = async (
        address: CreateAddressPayload
    ): Promise<AddressProxy> => {
        const response = await api.post<AddressProxy>('/addresses', address, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const getUserAddresses = async (): Promise<AddressProxy[]> => {
        const response = await api.get<AddressProxy[]>('/users/me/addresses', {
            headers: { Authorization: 'Bearer ' + token }
        });
        return response.data;
    };

    const updateUserAddress = async (
        address: UpdateAddressPayload,
        addressId: number
    ): Promise<void> => {
        await api.patch('/addresses/' + addressId, address, {
            headers: { Authorization: 'Bearer ' + token }
        });
    };

    const deleteUserAddress = async (addressId: number): Promise<void> => {
        await api.delete('/addresses/' + addressId, {
            headers: { Authorization: 'Bearer ' + token }
        });
    };

    return (
        //#region JSX

        <UserContext.Provider
            value={{
                me,
                setMe,
                selectedAddress,
                setSelectedAddress,
                getUserProperties,
                updateUser,
                createUserAddress,
                getUserAddresses,
                updateUserAddress,
                deleteUserAddress
            }}
        >
            {children}
        </UserContext.Provider>

        //#endregion
    );
};

export default UserProvider;
