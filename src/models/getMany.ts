export interface GetMany<T> {
    page: number;
    pageCount: number;
    count: number;
    total: number;
    data: T[];
}
