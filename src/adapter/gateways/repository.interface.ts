import { type Entity } from '../../domain/entity/entity'

export interface RepositoryInterface<E extends Entity> {
  insert: (entity: E) => Promise<void>
  findById: (id: string) => Promise<E>
  findAll: () => Promise<E[]>
  update: (entity: E) => Promise<void>
  delete: (id: string) => Promise<void>
}

export type SortDirection = 'asc' | 'desc'

export interface SearchParams<Filter = string> {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: Filter | null
}

export interface SearchResult<E extends Entity, Filter> {
  items: E[]
  total: number
  currentPage: number
  perPage: number
  sort: string | null
  sortDir: string | null
  filter: Filter | null
}

export interface SearchableRepositoryInterface<
  E extends Entity<unknown>,
  Filter = string,
  searchInput = SearchParams<Filter>,
  searchOutput = SearchResult<E, Filter>
> extends RepositoryInterface<E> {
  sortableFields: string[]
  search: (props: searchInput) => Promise<searchOutput>
}
