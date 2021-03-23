import React, { useState } from 'react';

import { CategoryProxy } from '../../../models/proxies/category';

import { Category, Container } from './styles';

interface CategoriesBarProps {
    categoriesList: CategoryProxy[];
    onClick(category: CategoryProxy): void;
    onMoreClick(): void;
}

const CategoriesBar: React.FC<CategoriesBarProps> = ({
    categoriesList,
    onClick,
    onMoreClick
}: CategoriesBarProps) => {
    const [primaryCategories] = useState<CategoryProxy[]>(
        categoriesList.slice(0, 6)
    );

    return (
        <Container>
            {primaryCategories.map((category) => (
                <Category key={category.id} onClick={() => onClick(category)}>
                    {category.name}
                </Category>
            ))}
            {categoriesList.length > 6 && (
                <Category onClick={onMoreClick}>Mais</Category>
            )}
        </Container>
    );
};

export default CategoriesBar;
