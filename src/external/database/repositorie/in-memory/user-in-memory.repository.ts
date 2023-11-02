import { SortDirection } from '../../../../adapter/gateways/repository.interface'
import { type UserRepository } from '../../../../adapter/gateways/user.repository'
import { type UserEntity } from '../../../../domain/entity/user/user.entity'
import { ConflictError } from '../../../../shared/error/conflict-error'
import { NotFoundError } from '../../../../shared/error/not-found-error'
import { InMemorySearchableRepository } from '../../../../shared/util/repository/in-memory/in-memory-searchable.repository'

export class UserInMemoryRepository
  extends InMemorySearchableRepository<UserEntity>
  implements UserRepository.Repository {
  protected async applyFilter (items: UserEntity[], filter: UserRepository.Filter): Promise<UserEntity[]> {
    if (!filter) {
      return items
    }
    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase())
    })
  }

  sortableFields: string[] = ['name', 'createdAt']

  async findByEmail (email: string): Promise<UserEntity> {
    const entity: UserEntity | undefined = this.items.find(item => item.email === email)
    if (entity === undefined) {
      throw new NotFoundError(`Entity not found using email ${email}`)
    }
    return entity
  }

  async emailExists (email: string): Promise<void> {
    const entity: UserEntity | undefined = this.items.find(item => item.email === email)
    if (entity !== undefined) {
      throw new ConflictError('Email address already used')
    }
  }

  protected async applySort (
    items: UserEntity[],
    sort: string | null,
    sortDir: SortDirection | null
  ): Promise<UserEntity[]> {
    return !sort
      ? await super.applySort(items, 'createdAt', 'desc')
      : await super.applySort(items, sort, sortDir)
  }
}
