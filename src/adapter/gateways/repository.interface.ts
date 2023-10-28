import { type Entity } from '../../domain/entity/entity'
import { type UserEntity } from '../../domain/entity/user/user.entity'
import { type SearchParams } from '../../shared/util/repository/search-params/search-params'

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

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchParams,
  SearchOutput,
> extends RepositoryInterface<E> {
  search: (props: SearchParams) => Promise<SearchOutput>
}

export interface UserRepository extends SearchableRepositoryInterface<UserEntity, SearchParams, any> {
  findByEmail: (email: string) => Promise<UserEntity>
  emailExists: (email: string) => Promise<void>
}
