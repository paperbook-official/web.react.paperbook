import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { ActionResultEnum } from '../../../models/enums/actionResultTypes';
import { LoginPayload } from '../../../models/payloads/auth/loginPayload';

import bookstore from '../../../assets/images/bookstore.jpg';

import { useActionResult } from '../../../hooks/useActionResult';
import { useAuth } from '../../../hooks/useAuth';
import { useCookies } from '../../../hooks/useCookies';
import { useUser } from '../../../hooks/useUser';

import BackButton from '../../../components/atoms/BackButton';
import Checkbox from '../../../components/atoms/Checkbox';
import SocialMedia from '../../../components/atoms/SocialMedia';
import TextField from '../../../components/molecules/TextField';
import { useTheme } from 'styled-components';

import { emailValidation } from '../../../utils/validations';

import { ReactComponent as PaperBookIcon } from '../../../assets/icons/book-reader.svg';

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
    ForgotPassword,
    FormContainer,
    GradientOverlay,
    RememberContainer
} from './styles';

const Login: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const history = useHistory();
    const { setMe } = useUser();
    const { login, getToken, setToken, setTokenCookie } = useAuth();
    const { isCookiesAccepted, setCookiesBarConfirmed } = useCookies();
    const { show } = useActionResult();

    const [isRememberActive, setRememberActive] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setEmailValid] = useState(false);

    const paperbookIconSize = 50;

    const handleButtonClick = async (): Promise<void> => {
        const payload: LoginPayload = {
            email,
            password
        };

        try {
            const data = await getToken(payload);
            if (data.token) {
                const expires =
                    data.expiresIn[1] === 'a'
                        ? parseInt(data.expiresIn[0]) * 365
                        : parseInt(data.expiresIn[0]);

                setToken(data.token);
                if (isRememberActive) {
                    setTokenCookie(data.token, expires);
                }

                const userData = await login(data.token);
                setMe(userData);
            }
        } catch (error) {
            const response = error.response.data;
            if (response.statusCode === 401) {
                show(
                    'Falha no Login',
                    'E-mail ou senha incorreto(a)!',
                    ActionResultEnum.ERROR
                );
            }
            if (response.statusCode === 500) {
                show(
                    'Falha no Login',
                    'Falha ao conectar-se ao servidor!',
                    ActionResultEnum.ERROR
                );
            }
        }
    };

    const checkKeyboardKey = (
        event: React.KeyboardEvent<HTMLInputElement>,
        elementName: string
    ): void => {
        if (event.key === 'Enter') {
            document.getElementsByName(elementName)[0].blur();

            if (email.length > 0 && password.length > 0) {
                handleButtonClick();
            }
        }
    };

    const handleCheckboxClick = (): void => {
        if (isCookiesAccepted) setRememberActive(!isRememberActive);
        else setCookiesBarConfirmed(false);
    };

    const handleBackButtonClick = (): void => {
        history.goBack();
    };

    return (
        <Container theme={theme}>
            <BackgroundImage
                src={bookstore}
                alt="bookstore"
                height={1332}
                width={1441}
            />
            <GradientOverlay></GradientOverlay>
            <Card>
                <CardTitle>Entrar</CardTitle>
                <FormContainer>
                    <FieldsContainer>
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
                            onKeyDown={(
                                event: React.KeyboardEvent<HTMLInputElement>
                            ) => checkKeyboardKey(event, 'passwordInput')}
                        />
                    </FieldsContainer>
                    <FieldsFooterContainer>
                        <RememberContainer>
                            <Checkbox
                                isActive={isRememberActive}
                                onClick={handleCheckboxClick}
                            />
                            <span
                                style={{ pointerEvents: 'none', marginLeft: 5 }}
                            >
                                Lembrar
                            </span>
                        </RememberContainer>
                        <ForgotPassword>Esqueceu a Senha?</ForgotPassword>
                    </FieldsFooterContainer>
                </FormContainer>
                <Button
                    style={{ marginBottom: 10 }}
                    disabled={!isEmailValid || password.length <= 4}
                    label="Continuar"
                    handleClick={handleButtonClick}
                />
                <AuthToggleScreen
                    style={{ marginBottom: 20 }}
                    path="/signup"
                    text="Não possui uma conta?"
                    clickableText="Registre-se!"
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
                subtitle="A sua livraria e papelaria favorita!"
            />
        </Container>
    );
};

export default Login;
