export type SearchingAlgorithm = "linear" | "binary";
export type SortingAlgorithm = "selection" | "bubble";
export type Order = "asc" | "desc";


export interface Query<T> {
	page: number;
	pageSize: number;
	order: Order;
	orderBy: keyof T;
	searchText?: string;
	searchField: keyof T;
	searchingAlgorithm: SearchingAlgorithm;
	sortingAlgorithm: SortingAlgorithm;
}

