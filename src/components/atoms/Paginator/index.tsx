import React, { useEffect, useState } from 'react';

import { range } from '../../../utils/arrayManagement';

import { Container, PageButton } from './styles';

interface PaginatorProps {
    page: number;
    pageAmount: number;
    style?: React.CSSProperties;
    onPageChange(page: number): void;
}

const visiblePagesLength = 5;

const Paginator: React.FC<PaginatorProps> = ({
    page,
    pageAmount,
    style,
    onPageChange
}: PaginatorProps): JSX.Element => {
    const [visiblePages, setVisiblePages] = useState<number[]>();

    useEffect(() => {
        setVisiblePages(
            range(
                1,
                pageAmount <= visiblePagesLength
                    ? pageAmount
                    : visiblePagesLength
            )
        );
    }, []);

    useEffect(() => {
        if (
            page > Math.ceil(visiblePagesLength / 2) &&
            pageAmount > visiblePagesLength
        ) {
            if (page + 2 <= pageAmount) {
                setVisiblePages(range(page - 2 > 0 ? page - 2 : 1, page + 2));
            } else if (page + 1 <= pageAmount) {
                setVisiblePages(range(page - 3 > 0 ? page - 3 : 1, page + 1));
            } else if (page === pageAmount) {
                setVisiblePages(range(page - 4 > 0 ? page - 4 : 1, page));
            }
        } else if (pageAmount > visiblePagesLength) {
            setVisiblePages(range(1, visiblePagesLength));
        }
    }, [page]);

    return (
        <Container style={style}>
            <PageButton
                disabled={page <= 1}
                className={page <= 1 ? 'disabled' : ''}
                onClick={() => onPageChange(page - 1)}
            >
                {'<<'}
            </PageButton>
            {visiblePages &&
                visiblePages.map((pageNumber) => (
                    <PageButton
                        key={pageNumber}
                        className={pageNumber === page ? 'selected' : ''}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </PageButton>
                ))}
            <PageButton
                disabled={page >= pageAmount}
                className={page >= pageAmount ? 'disabled' : ''}
                onClick={() => onPageChange(page + 1)}
            >
                {'>>'}
            </PageButton>
        </Container>
    );
};

export default Paginator;
