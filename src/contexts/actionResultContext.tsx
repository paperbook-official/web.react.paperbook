import React, { createContext, useState } from 'react';

import { ActionResultEnum } from '../models/enums/actionResultTypes';

import Snackbar from '../components/atoms/Snackbar';

export interface ActionResultContextData {
    title: string;
    setTitle(title: string): void;
    description: string;
    setDescription(description: string): void;
    type: ActionResultEnum;
    setType(type: ActionResultEnum): void;
    isVisible: boolean;
    setVisible(value: boolean): void;
    show(title: string, description: string, type: ActionResultEnum): void;
}

interface ActionResultProviderProps {
    children: JSX.Element;
}

export const ActionResultContext = createContext<ActionResultContextData>(
    {} as ActionResultContextData
);

export const ActionResultProvider: React.FC<ActionResultProviderProps> = ({
    children
}: ActionResultProviderProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState(ActionResultEnum.ERROR);
    const [isVisible, setVisible] = useState(false);

    const show = (
        title: string,
        description: string,
        type: ActionResultEnum
    ): void => {
        setTitle(title);
        setDescription(description);
        setType(type);
        setVisible(true);
    };

    return (
        //#region JSX

        <ActionResultContext.Provider
            value={{
                title,
                setTitle,
                description,
                setDescription,
                type,
                setType,
                isVisible,
                setVisible,
                show
            }}
        >
            {children}
            {isVisible && (
                <Snackbar
                    title={title}
                    description={description}
                    type={type}
                    onClose={() => setVisible(false)}
                />
            )}
        </ActionResultContext.Provider>

        //#endregion
    );
};

export default ActionResultProvider;
