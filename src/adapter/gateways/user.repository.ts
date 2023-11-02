/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-namespace */
import { type UserEntity } from '../../domain/entity/user/user.entity'
import {
  type SearchResult as DefaultSearchResult,
  type SearchableRepositoryInterface,
  type SearchParams as URLSearchParams
} from './repository.interface'

export namespace UserRepository {
  export type Filter = string

  export class SearchParams extends URLSearchParams<Filter> {
  
  }

  export class SearchResult extends DefaultSearchResult<UserEntity, Filter> {
   
  }

  export interface Repository extends SearchableRepositoryInterface<UserEntity, Filter, SearchParams, SearchResult> {
    findByEmail(email: string): Promise<UserEntity>
    emailExists(email: string): Promise<void>
  }
}
