import { type SearchParams, type SearchableRepositoryInterface } from '../../../../adapter/gateways/repository.interface'
import { type Entity } from '../../../../domain/entity/entity'
import { InMemoryRepository } from './in-memory.repository'

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, SearchParams, any> {
  async search (props: SearchParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
