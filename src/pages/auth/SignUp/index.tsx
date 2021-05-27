import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ActionResultEnum } from '../../../models/enums/actionResultTypes';
import { LoginPayload } from '../../../models/payloads/auth/loginPayload';
import { CreateUserPayload } from '../../../models/payloads/user/createUser';

import { useActionResult } from '../../../hooks/useActionResult';
import { useAuth } from '../../../hooks/useAuth';
import { useCookies } from '../../../hooks/useCookies';
import { useUser } from '../../../hooks/useUser';

import BackButton from '../../../components/atoms/BackButton';
import Checkbox from '../../../components/atoms/Checkbox';
import SocialMedia from '../../../components/atoms/SocialMedia';
import TextField from '../../../components/molecules/TextField';
import { useTheme } from 'styled-components';

import {
    emailValidation,
    nameValidation,
    passwordValidation
} from '../../../utils/validations';

import { ReactComponent as PaperBookIcon } from '../../../assets/icons/book-reader.svg';
import openbook from '../../../assets/images/open-book-2.jpg';

import AuthToggleScreen from '../AuthToggleScreen';
import Button from '../Button';
import Content from '../Content';
import {
    BackgroundImage,
    Card,
    CardTitle,
    Container,
    FieldsContainer,
    FieldsFooterContainer,
    FormContainer,
    GradientOverlay,
    Terms,
    CheckboxContainer,
    FullNameContainer
} from './styles';

const SignUp: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const history = useHistory();
    const { setMe } = useUser();
    const { getToken, signUp, setToken, setTokenCookie } = useAuth();
    const { isCookiesAccepted, setCookiesBarConfirmed } = useCookies();
    const { show } = useActionResult();

    const [isRememberActive, setRememberActive] = useState(false);
    const [isTermsActive, setTermsActive] = useState(false);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNameValid, setNameValid] = useState(false);
    const [isLastNameValid, setLastNameValid] = useState(false);
    const [isEmailValid, setEmailValid] = useState(false);
    const [isPasswordValid, setPasswordValid] = useState(false);
    const [isConfirmPasswordValid, setConfirmPasswordValid] = useState(false);

    const [isLoading, setLoading] = useState(false);

    const paperbookIconSize = 50;

    const handleButtonClick = async (): Promise<void> => {
        setLoading(true);

        const payload: CreateUserPayload = {
            name,
            lastName,
            email,
            password
        };

        const authPayload: LoginPayload = {
            email,
            password
        };

        try {
            const userData = await signUp(payload);
            setMe(userData);

            const data = await getToken(authPayload);

            if (data.token) {
                const expLen = data.expiresIn.length - 1;
                const expires =
                    data.expiresIn[expLen] === 'a'
                        ? parseInt(data.expiresIn.substr(0, expLen)) * 365
                        : parseInt(data.expiresIn.substr(0, expLen));

                setToken(data.token);
                if (isRememberActive) {
                    setTokenCookie(data.token, expires);
                }
                setLoading(false);
            }
            history.push('/');
        } catch (error) {
            show(
                'Falha ao se Registrar',
                'E-mail já existe ou conexão falhou!',
                ActionResultEnum.ERROR
            );
            setLoading(false);
        }
    };

    const validateConfirmPassword = (): boolean => {
        return confirmPassword === password;
    };

    const isFormValid = (): boolean => {
        return (
            isNameValid &&
            isLastNameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid &&
            isTermsActive
        );
    };

    const checkKeyboardKey = (
        event: React.KeyboardEvent<HTMLInputElement>,
        elementName: string
    ): void => {
        if (event.key === 'Enter') {
            document.getElementsByName(elementName)[0].blur();

            if (isFormValid()) {
                handleButtonClick();
            }
        }
    };

    const handleTermsClick = (): void => {
        setTermsActive(!isTermsActive);
    };

    const handleRememberClick = (): void => {
        if (isCookiesAccepted) setRememberActive(!isRememberActive);
        else setCookiesBarConfirmed(false);
    };

    const handleBackButtonClick = (): void => {
        history.push('/');
    };

    return (
        <Container theme={theme}>
            <BackgroundImage
                src={openbook}
                alt="bookstore"
                height={2560}
                width={1440}
            />
            <GradientOverlay></GradientOverlay>
            <Card>
                <CardTitle>Registrar</CardTitle>
                <FormContainer>
                    <FieldsContainer>
                        <FullNameContainer>
                            <TextField
                                label="Nome"
                                name="nameInput"
                                onTextChange={setName}
                                type="text"
                                errorMessage="Nome inválido!"
                                validation={nameValidation}
                                isValid={setNameValid}
                                onKeyDown={(
                                    event: React.KeyboardEvent<HTMLInputElement>
                                ) => checkKeyboardKey(event, 'nameInput')}
                                style={{ width: 140 }}
                            />
                            <TextField
                                label="Sobrenome"
                                name="lastNameInput"
                                onTextChange={setLastName}
                                type="text"
                                errorMessage="Sobrenome inválido!"
                                validation={nameValidation}
                                isValid={setLastNameValid}
                                onKeyDown={(
                                    event: React.KeyboardEvent<HTMLInputElement>
                                ) => checkKeyboardKey(event, 'lastNameInput')}
                                style={{ width: 140 }}
                            />
                        </FullNameContainer>
                        <TextField
                            label="E-mail"
                            name="emailInput"
                            onTextChange={setEmail}
                            type="text"
                            errorMessage="E-mail inválido!"
                            validation={emailValidation}
                            isValid={setEmailValid}
                            onKeyDown={(
                                event: React.KeyboardEvent<HTMLInputElement>
                            ) => checkKeyboardKey(event, 'emailInput')}
                        />
                        <TextField
                            label="Senha"
                            name="passwordInput"
                            onTextChange={setPassword}
                            type="password"
                            errorMessage="Senha inválida!"
                            validation={passwordValidation}
                            isValid={setPasswordValid}
                            onKeyDown={(
                                event: React.KeyboardEvent<HTMLInputElement>
                            ) => checkKeyboardKey(event, 'passwordInput')}
                        />
                        <TextField
                            label="Confirmar Senha"
                            name="confirmPasswordInput"
                            onTextChange={setConfirmPassword}
                            type="password"
                            errorMessage="Senhas não conferem!"
                            validation={validateConfirmPassword}
                            isValid={setConfirmPasswordValid}
                            onKeyDown={(
                                event: React.KeyboardEvent<HTMLInputElement>
                            ) =>
                                checkKeyboardKey(event, 'confirmPasswordInput')
                            }
                        />
                    </FieldsContainer>
                    <FieldsFooterContainer>
                        <CheckboxContainer>
                            <Checkbox
                                isActive={isTermsActive}
                                onClick={handleTermsClick}
                            />
                            <span style={{ marginLeft: 5 }}>
                                Li e aceito os{' '}
                                <Terms>termos de contrato.</Terms>
                            </span>
                        </CheckboxContainer>
                    </FieldsFooterContainer>
                    <FieldsFooterContainer style={{ marginTop: 5 }}>
                        <CheckboxContainer>
                            <Checkbox
                                isActive={isRememberActive}
                                onClick={handleRememberClick}
                            />
                            <span
                                style={{ pointerEvents: 'none', marginLeft: 5 }}
                            >
                                Lembrar de mim
                            </span>
                        </CheckboxContainer>
                    </FieldsFooterContainer>
                </FormContainer>
                <Button
                    disabled={!isFormValid()}
                    label="Vamos lá"
                    handleClick={handleButtonClick}
                    isLoading={isLoading}
                />
                <AuthToggleScreen
                    style={{ marginBottom: 20 }}
                    path="/login"
                    text="Já possui uma conta?"
                    clickableText="Entre agora!"
                />
            </Card>
            <BackButton
                style={{ left: 20, top: 20 }}
                onClick={handleBackButtonClick}
            />
            <PaperBookIcon
                style={{ position: 'absolute', right: 400 + 20, bottom: 20 }}
                height={`${paperbookIconSize}px`}
                width={`${paperbookIconSize}px`}
                color={theme.colors.background}
            />
            <SocialMedia style={{ left: 20, bottom: 20 }} />
            <Content
                style={{ left: '10%', top: '35%' }}
                title="PaperBook"
                subtitle="Entre, acomode-se e divirta-se com nossos produtos!"
            />
        </Container>
    );
};

export default SignUp;
