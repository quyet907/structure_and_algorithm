export interface Paging<T> {
    rows: T[];
    page: number;
    total: number;
    pageSize: number;
    totalPages: number;
}