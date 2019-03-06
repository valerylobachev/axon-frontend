export interface Pagination {
  sortBy: string
  descending: boolean
  page: number
  rowsPerPage: number
}

export interface BaseState<F, T, S> {
  entities: { [id: string]: S };
  entityArray: S[]

  filterInitialized: boolean;
  filter: F;
  entitiesLoading: boolean;

  failure: any;

  pagination: Pagination
}

