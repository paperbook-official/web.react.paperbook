import React, { useState } from 'react';

import { useTheme } from 'styled-components';

import { ReactComponent as FacebookIcon } from '../../../assets/icons/facebook.svg';
import { ReactComponent as InstagramIcon } from '../../../assets/icons/instagram.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/icons/twitter.svg';

import { Container } from './styles';

interface SocialMediaProps {
    style?: React.CSSProperties;
    baseIconColor?: string;
}

const SocialMedia: React.FC<SocialMediaProps> = ({
    style,
    baseIconColor
}: SocialMediaProps): JSX.Element => {
    const theme = useTheme();

    const [facebookColor, setFacebookColor] = useState(
        baseIconColor || theme.colors.defaultLightGrey
    );
    const [twitterColor, setTwitterColor] = useState(
        baseIconColor || theme.colors.defaultLightGrey
    );
    const [instagramColor, setInstagramColor] = useState(
        baseIconColor || theme.colors.defaultLightGrey
    );

    const iconSize = 30;

    const handleFacebookClick = (): void => {
        window.open('https://www.facebook.com', '_blank');
    };

    const handleTwitterClick = (): void => {
        window.open('https://www.twitter.com', '_blank');
    };

    const handleInstagramClick = (): void => {
        window.open('https://www.instagram.com', '_blank');
    };

    return (
        <Container style={style}>
            <FacebookIcon
                onMouseEnter={() => setFacebookColor('#4267B2')}
                onMouseLeave={() =>
                    setFacebookColor(
                        baseIconColor || theme.colors.defaultLightGrey
                    )
                }
                onClick={handleFacebookClick}
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                width={`${iconSize}px`}
                height={`${iconSize}px`}
                color={facebookColor}
            />
            <TwitterIcon
                onMouseEnter={() => setTwitterColor('#1DA1F2')}
                onMouseLeave={() =>
                    setTwitterColor(
                        baseIconColor || theme.colors.defaultLightGrey
                    )
                }
                onClick={handleTwitterClick}
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                width={`${iconSize}px`}
                height={`${iconSize}px`}
                color={twitterColor}
            />
            <InstagramIcon
                onMouseEnter={() => setInstagramColor('#FFDC80')}
                onMouseLeave={() =>
                    setInstagramColor(
                        baseIconColor || theme.colors.defaultLightGrey
                    )
                }
                onClick={handleInstagramClick}
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                width={`${iconSize}px`}
                height={`${iconSize}px`}
                color={instagramColor}
            />
        </Container>
    );
};

export default SocialMedia;
