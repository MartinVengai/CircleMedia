export interface IFilter {
    searchTerm: string;
    sortBy: string;
    isSortAscending: boolean;
    page: number;
    pageSize: number;
}

export interface ProjectFilter {
    searchTerm: string;
    sortBy: string;
    isSortAscending: boolean;
    page: number;
    pageSize: number;
    userId: string;
}
