export interface IFilter {
  searchTerm: string;
  sortBy: string;
  isSortAscending: boolean;
  page: number;
  pageSize: number;
}