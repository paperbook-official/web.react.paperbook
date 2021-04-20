import React, { useState } from 'react';

import { ReactComponent as ToggleIcon } from '../../../assets/icons/chevron-left.svg';

import { Container, Select, SelectorContainer, SelectorRow } from './styles';

interface SelectorProps {
    style?: React.CSSProperties;
    items: string[];
    onSelect(index: number): void;
}

const Selector: React.FC<SelectorProps> = ({
    style,
    items,
    onSelect
}: SelectorProps): JSX.Element => {
    const [selectedItem, setSelectedItem] = useState(0);

    const handleSelectClick = (isReversed?: boolean): void => {
        const selector = document.getElementsByClassName('selector')[0];
        selector.classList.toggle('active');

        if (selector.classList.contains('reversed')) {
            setTimeout(() => {
                selector.classList.remove('reversed');
            }, 300);
        } else if (isReversed) {
            selector.classList.add('reversed');
        }
    };

    return (
        <Container style={style}>
            <Select
                className="selector"
                onClick={(event) => {
                    const elemPos = (event.target as HTMLElement).getBoundingClientRect();
                    handleSelectClick(
                        window.innerHeight - elemPos.y <= 50 + 40 * items.length
                    );
                }}
            >
                <span>{items[selectedItem]}</span>
                <ToggleIcon height="24" width="24" className="toggle-icon" />
            </Select>
            <SelectorContainer>
                {items.map((item, index) => (
                    <SelectorRow
                        key={index}
                        onClick={() => {
                            setSelectedItem(index);
                            onSelect(index);
                            handleSelectClick();
                        }}
                    >
                        {item}
                    </SelectorRow>
                ))}
            </SelectorContainer>
        </Container>
    );
};

export default Selector;
