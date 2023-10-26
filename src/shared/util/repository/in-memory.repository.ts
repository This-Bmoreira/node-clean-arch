import { type RepositoryInterface } from '../../../adapter/gateways/repository.interface'
import { type Entity } from '../../../domain/entity/entity'
import { NotFoundError } from '../../error/not-found-error'

export abstract class InMemoryRepository<E extends Entity<unknown>>
implements RepositoryInterface<E> {
  items: E[] = []

  async insert (entity: E): Promise<void> {
    this.items.push(entity)
  }

  async findById (id: string): Promise<E> {
    return await this._get(id)
  }

  async findAll (): Promise<E[]> {
    return this.items
  }

  async update (entity: E): Promise<void> {
    await this._get(entity.id)
    const index = this.items.findIndex(item => item.id === entity.id)
    this.items[index] = entity
  }

  async delete (id: string): Promise<void> {
    await this._get(id)
    const index = this.items.findIndex(item => item.id === id)
    this.items.splice(index, 1)
  }

  protected async _get (id: string): Promise<E> {
    const _id = `${id}`
    const entity = this.items.find(item => item.id === _id)
    if (entity === undefined) {
      throw new NotFoundError('Entity not found')
    }
    return entity
  }
}
