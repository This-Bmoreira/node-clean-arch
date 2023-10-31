import { type Entity } from '../../domain/entity/entity'
import { type UserEntity } from '../../domain/entity/user/user.entity'
import { type SearchParams } from '../../shared/util/repository/search-params/search-params'
import { type SearchResult } from '../../shared/util/repository/search-params/search-result'

export interface RepositoryInterface<E extends Entity> {
  insert: (entity: E) => Promise<void>
  findById: (id: string) => Promise<E>
  findAll: () => Promise<E[]>
  update: (entity: E) => Promise<void>
  delete: (id: string) => Promise<void>
}

export type SortDirection = 'asc' | 'desc'

export interface SearchProps<Filter = string> {
  page?: number
  perPage?: number
  sort?: string | null
  sortDir?: SortDirection | null
  filter?: Filter | null
}

export interface SearchResultProps<E extends Entity, Filter> {
  items: E[]
  total: number
  currentPage: number
  perPage: number
  sort: string | null
  sortDir: string | null
  filter: Filter | null
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  searchInput = SearchParams,
  Filter = string,
  searchOutput = SearchResult<E, Filter>,
> extends RepositoryInterface<E> {
  sortableFields: string[]
  search: (props: searchInput) => Promise<searchOutput>
}

export interface UserRepository extends SearchableRepositoryInterface<UserEntity, SearchParams, SearchResult<UserEntity, string>> {
  findByEmail: (email: string) => Promise<UserEntity>
  emailExists: (email: string) => Promise<void>
}
