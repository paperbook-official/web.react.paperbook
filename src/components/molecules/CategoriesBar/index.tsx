import React, { useEffect, useState } from 'react';

import { CategoryProxy } from '../../../models/proxies/category/category';


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
    const [categories, setCategories] = useState<CategoryProxy[]>();
    const [primaryCategories, setPrimaryCategories] = useState<
        CategoryProxy[]
    >();

    useEffect(() => {
        setCategories(categoriesList);
        setPrimaryCategories(categoriesList.slice(0, 6));
    }, []);

    return (
        <Container>
            {primaryCategories &&
                primaryCategories.map((category) => (
                    <Category
                        key={category.id}
                        onClick={() => onClick(category)}
                    >
                        {category.name}
                    </Category>
                ))}
            {categories && categories.length > 6 && (
                <Category onClick={onMoreClick}>Mais</Category>
            )}
        </Container>
    );
};

export default CategoriesBar;
