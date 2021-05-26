import React, { useEffect, useState } from 'react';

import { ActionResultEnum } from '../../../models/enums/actionResultTypes';
import { UserProxy } from '../../../models/proxies/user/user';

import { useActionResult } from '../../../hooks/useActionResult';
import { useUser } from '../../../hooks/useUser';

import {
    cpfValidation,
    nameValidation,
    phoneValidation
} from '../../../utils/validations';

import LoadingDots from '../../atoms/LoadingDots';
import TextField from '../TextField';
import {
    ActionButton,
    ActionsContainer,
    CheckIcon,
    Container,
    FieldsContainer,
    Title
} from './styles';

interface SellerIdentificationProps {
    onConfirmClick(): void;
}

const SellerIdentification: React.FC<SellerIdentificationProps> = ({
    onConfirmClick
}: SellerIdentificationProps): JSX.Element => {
    const { me, setMe, updateUser } = useUser();
    const { show } = useActionResult();

    const [user, setUser] = useState<UserProxy>();
    const [step, setStep] = useState(1);

    const [containerScale, setContainerScale] = useState(1);
    const [checkScale, setCheckScale] = useState(0);
    const [isCheckLoading, setCheckLoading] = useState(false);

    useEffect(() => {
        setUser(me);
    }, []);

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

    const onSellerContinueClick = async (): Promise<void> => {
        setStep(step + 1);
        if (step === 2 && user) {
            setCheckLoading(true);

            try {
                await updateUser(
                    {
                        name: user.name,
                        lastName: '',
                        phone: user.phone,
                        cpf: user.cpf
                    },
                    user.id
                );

                setMe(user);

                setTimeout(() => {
                    setContainerScale(0);
                }, 2700);

                setTimeout(() => {
                    setCheckScale(1);
                }, 50);

                setTimeout(() => {
                    onConfirmClick();
                }, 3000);
            } catch (error) {
                setStep(2);
                show(
                    'Erro ao atualizar usuário!',
                    `Ocorreu um erro ao atualizar ${me?.name || ''}.`,
                    ActionResultEnum.ERROR
                );
            }

            setCheckLoading(false);
        }
    };

    const isStepValid = (): boolean => {
        if (step === 1) {
            return (
                cpfValidation(user?.cpf || '') &&
                phoneValidation(user?.phone || '')
            );
        }
        return nameValidation(user?.name || '');
    };

    return (
        <Container
            id="seller-identification"
            className={'step-' + step}
            style={{ transform: `scale(${containerScale})` }}
        >
            {step !== 3 && (
                <Title>
                    {step === 1
                        ? `Olá, ${user?.name}`
                        : 'Digite seu nome de vendedor'}
                </Title>
            )}
            {step === 1 && (
                <span>
                    Antes de continuar, precisamos de algumas informações
                </span>
            )}
            {step === 1 && (
                <FieldsContainer>
                    <TextField
                        key={1}
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
                        style={{ width: '250px' }}
                    />
                    <TextField
                        key={2}
                        value={user?.phone || ''}
                        label="Telefone"
                        name="phone"
                        onTextChange={(text: string) =>
                            user && setUser({ ...user, phone: text })
                        }
                        type="text"
                        mask={getPhoneMask()}
                        errorMessage="Telefone  inválido!"
                        validation={phoneValidation}
                        length={15}
                        style={{ width: '250px' }}
                    />
                </FieldsContainer>
            )}
            {step === 2 && (
                <FieldsContainer>
                    <TextField
                        key={3}
                        value={user?.name || ''}
                        label="Nome"
                        name="name"
                        onTextChange={(text: string) =>
                            user && setUser({ ...user, name: text })
                        }
                        type="text"
                        errorMessage="Campo obrigatório!"
                        validation={nameValidation}
                        style={{ width: '350px' }}
                    />
                </FieldsContainer>
            )}
            {step === 3 &&
                (isCheckLoading ? (
                    <LoadingDots />
                ) : (
                    <>
                        <CheckIcon
                            id="check-icon"
                            style={{ transform: `scale(${checkScale})` }}
                        />
                        <h1 className="check-text">
                            Pronto, já pode começar a vender!
                        </h1>
                    </>
                ))}
            {step !== 3 && (
                <ActionsContainer style={{ marginTop: 30 }}>
                    <ActionButton
                        className={`secondary ${step === 1 && 'hidden'}`}
                        onClick={() => setStep(step - 1)}
                    >
                        Voltar
                    </ActionButton>
                    <ActionButton
                        className={!isStepValid() ? 'disabled' : ''}
                        onClick={onSellerContinueClick}
                    >
                        {step === 1 ? 'Continuar' : 'Confirmar'}
                    </ActionButton>
                </ActionsContainer>
            )}
        </Container>
    );
};

export default SellerIdentification;
