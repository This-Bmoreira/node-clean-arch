import { type UserRepository } from '../../../../adapter/gateways/repository.interface'
import { type UserEntity } from '../../../../domain/entity/user/user.entity'
import { ConflictError } from '../../../../shared/error/conflict-error'
import { NotFoundError } from '../../../../shared/error/not-found-error'
import { InMemorySearchableRepository } from '../../../../shared/util/repository/in-memory/in-memory-searchable.repository'

export class UserInMemoryRepository
  extends InMemorySearchableRepository<UserEntity>
  implements UserRepository {
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
}
