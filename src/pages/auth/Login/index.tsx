import React, { useState } from 'react';
import { useHistory } from 'react-router';

import bookstore from '../../../assets/images/bookstore.jpg';

import BackButton from '../../../components/atoms/BackButton';
import Checkbox from '../../../components/atoms/Checkbox';
import SocialMedia from '../../../components/atoms/SocialMedia';
import { useTheme } from 'styled-components';

import { ReactComponent as PaperBookIcon } from '../../../assets//icons/book-reader.svg';

import AuthToggleScreen from '../AuthToggleScreen';
import Button from '../Button';
import Content from '../Content';
import {
    BackgroundImage,
    Card,
    CardTitle,
    Container,
    FieldsFooterContainer,
    ForgotPassword,
    GradientOverlay,
    RememberContainer
} from './styles';

const Login: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const history = useHistory();

    const [isRememberActive, setRememberActive] = useState(false);

    const paperbookIconSize = 50;

    const handleButtonClick = (): void => {
        history.push('/');
    };

    const handleCheckboxClick = (): void => {
        setRememberActive(!isRememberActive);
    };

    const handleBackButtonClick = (): void => {
        history.push('/');
    };

    return (
        <Container theme={theme}>
            <BackgroundImage src={bookstore} alt="bookstore" />
            <GradientOverlay></GradientOverlay>
            <Card>
                <CardTitle>Entrar</CardTitle>
                <FieldsFooterContainer>
                    <RememberContainer>
                        <Checkbox
                            isActive={isRememberActive}
                            onClick={handleCheckboxClick}
                        />
                        <span style={{ marginLeft: 5 }}>Lembrar</span>
                    </RememberContainer>
                    <ForgotPassword>Esqueceu a Senha?</ForgotPassword>
                </FieldsFooterContainer>
                <Button
                    style={{ marginTop: 100 }}
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
