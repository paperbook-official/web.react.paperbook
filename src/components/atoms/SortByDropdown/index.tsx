import React, { useEffect, useState } from 'react';

import { ReactComponent as ToggleIcon } from '../../../assets/icons/chevron-left.svg';

import {
    Container,
    DropdownContainer,
    DropdownToggle,
    PrependText,
    SortOption,
    SortOptionsContainer
} from './styles';

interface SortByDropdownProps {
    style?: React.CSSProperties;
    prependText?: string;
    options: string[];
    defaultOption: number;
    onChange?(option: number): void;
}

const SortByDropdown: React.FC<SortByDropdownProps> = ({
    style,
    prependText = 'Ordenar por',
    options,
    defaultOption,
    onChange
}: SortByDropdownProps): JSX.Element => {
    const [selectedOption, setSelectedOption] = useState<number>();

    useEffect(() => {
        setSelectedOption(defaultOption);
    }, []);

    const toggleDropdown = (): void => {
        const dropdownToggle = document.getElementsByClassName(
            'dropdown-toggle'
        )[0];
        dropdownToggle.classList.toggle('active');
    };

    const handleOptionClick = (option: number): void => {
        setSelectedOption(option + 1);
        toggleDropdown();
        if (onChange) onChange(option);
    };

    return (
        <Container style={style}>
            <PrependText>{prependText}</PrependText>
            <DropdownToggle
                className="dropdown-toggle"
                onClick={toggleDropdown}
            >
                {selectedOption && (
                    <SortOption>{options[selectedOption - 1]}</SortOption>
                )}
                <ToggleIcon className="toggle-icon" />
            </DropdownToggle>
            <DropdownContainer>
                <SortOptionsContainer>
                    {selectedOption &&
                        options.map((option, index) => (
                            <SortOption
                                className={
                                    index === selectedOption - 1
                                        ? 'selected'
                                        : ''
                                }
                                key={index}
                                onClick={() => handleOptionClick(index)}
                            >
                                {option}
                            </SortOption>
                        ))}
                </SortOptionsContainer>
            </DropdownContainer>
        </Container>
    );
};

export default SortByDropdown;
