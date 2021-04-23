import React, { useState } from 'react';

import { ReactComponent as GitHubIcon } from '../../../assets/icons/github.svg';
import { ReactComponent as NestJSIcon } from '../../../assets/icons/nestjs.svg';
import { ReactComponent as ReactIcon } from '../../../assets/icons/react.svg';

import Logo from '../../atoms/Logo';
import SocialMedia from '../../atoms/SocialMedia';
import {
    Container,
    ContentInputArea,
    CopyrightContainer,
    SubjectInputContainer,
    SubjectInput,
    SubjectLabel,
    ContentInputContainer,
    ContentInputLabel,
    SendButton
} from './styles';

const Footer: React.FC = (): JSX.Element => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const pushUrl = (type: string): void => {
        let url = '';

        if (type === 'github') {
            url = 'https://github.com/AppliedProject05';
        } else if (type === 'nestjs') {
            url = 'https://github.com/AppliedProject05/api.nestjs.paperbook';
        } else {
            url = 'https://github.com/AppliedProject05/web.react.paperbook';
        }

        window.open(url, '_blank');
    };

    const sendEmail = (): void => {
        const body = content.replace(/\n/g, '%0D%0A');
        const a = document.createElement('a');
        a.href = `mailto:appliedproject05@gmail.com?subject=${subject}&body=${body}`;
        a.click();
        a.remove();
    };

    return (
        <>
            <Container>
                <div className="first">
                    <Logo />
                    <p>
                        Paperbook é um e-commerce voltado para livros e artigos
                        de papelaria. Aqui, grande parte do lucro é doado para
                        instituições de caridade.
                    </p>
                    <SocialMedia />
                </div>
                <div className="second">
                    <GitHubIcon
                        onClick={() => pushUrl('github')}
                        className="icon"
                        color="white"
                        height="70"
                        width="70"
                    />
                    <ReactIcon
                        onClick={() => pushUrl('react')}
                        className="icon"
                        color="#00D8FF"
                        height="70"
                        width="70"
                    />
                    <NestJSIcon
                        onClick={() => pushUrl('nestjs')}
                        className="icon"
                        color="#E0234E"
                        height="70"
                        width="70"
                    />
                </div>
                <div className="third">
                    <h2>Contate-nos</h2>
                    <SubjectInputContainer>
                        <SubjectInput
                            id="subject-input"
                            onChange={(element) =>
                                setSubject(element.target.value)
                            }
                            name="subjectInput"
                            type="text"
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    const contentInput = document.getElementById(
                                        'content-input'
                                    );
                                    contentInput?.focus();
                                }
                            }}
                            required
                        />
                        <SubjectLabel>Assunto</SubjectLabel>
                    </SubjectInputContainer>
                    <ContentInputContainer>
                        <ContentInputArea
                            id="content-input"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            name="contentInput"
                            required
                        />
                        <ContentInputLabel>Conteúdo</ContentInputLabel>
                    </ContentInputContainer>
                    <SendButton
                        disabled={subject.length < 1 || content.length < 1}
                        className={
                            subject.length < 1 || content.length < 1
                                ? 'disabled'
                                : ''
                        }
                        onClick={sendEmail}
                    >
                        Enviar
                    </SendButton>
                </div>
            </Container>
            <CopyrightContainer>
                © Paperbook | Design por Michell Algarra
            </CopyrightContainer>
        </>
    );
};

export default Footer;
