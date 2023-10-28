import { Entity } from '../../../../domain/entity/entity'
import { NotFoundError } from '../../../error/not-found-error'
import { userDataBuilder } from '../../user/user-data-builder'
import { InMemoryRepository } from './in-memory.repository'

interface StubEntityProps {
  name: string
  email: string
  password: string
  createdAt?: Date
}

class StubEntity extends Entity<StubEntityProps> { }

class StubInMemoryRepository extends InMemoryRepository<StubEntity> { }

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository
  let stubProps: StubEntityProps

  beforeEach(() => {
    stubProps = userDataBuilder({})
    sut = new StubInMemoryRepository()
  })

  describe('insert', () => {
    it('Should inserts a new entity', async () => {
      const entity = new StubEntity(stubProps)
      await sut.insert(entity)
      expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
    })
  })

  describe('findById', () => {
    it('Should throw error when entity not found', async () => {
      await expect(sut.findById('fakeId')).rejects.toThrow(
        new NotFoundError('Entity not found')
      )
    })

    it('Should find a entity by id', async () => {
      const entity = new StubEntity(stubProps)
      await sut.insert(entity)
      const result = await sut.findById(entity.id)
      expect(entity.toJSON()).toStrictEqual(result.toJSON())
    })
  })

  describe('findAll', () => {
    it('Should returns  all entities', async () => {
      const entity = new StubEntity(stubProps)
      await sut.insert(entity)
      const result = await sut.findAll()
      expect(entity).toStrictEqual(result[0])
    })
  })

  describe('update', () => {
    it('Should throw error on update when entity not found', async () => {
      const entity = new StubEntity(stubProps)
      await expect(sut.update(entity)).rejects.toThrow(
        new NotFoundError('Entity not found')
      )
    })

    it('Should update an entity', async () => {
      const entity = new StubEntity(stubProps)
      await sut.insert(entity)
      const entityUpdated = new StubEntity(
        stubProps,
        entity.id
      )
      await sut.update(entityUpdated)
      console.log(entityUpdated)
      expect(entityUpdated.toJSON()).toStrictEqual(sut.items[0].toJSON())
    })
  })

  describe('delete', () => {
    it('Should throw error when entity not found', async () => {
      await expect(sut.delete('fakeId')).rejects.toThrow(
        new NotFoundError('Entity not found')
      )
    })

    it('Should delete an entity', async () => {
      const entity = new StubEntity(stubProps)
      await sut.insert(entity)
      await sut.delete(entity.id)
      expect(sut.items).toHaveLength(0)
    })
  })
})
