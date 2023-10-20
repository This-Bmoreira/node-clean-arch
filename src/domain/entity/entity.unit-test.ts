import { validate as uuidValidate } from 'uuid'
import { userDataBuilder } from '../../shared/util/user/user-data-builder'
import { Entity } from './entity'

interface StubProps {
  name: string
  email: string
  password: string
  createAt?: Date
}

class StubEntity extends Entity<StubProps> { }

const makeSut = (stubProps: StubProps, id?: string): StubEntity => {
  return new StubEntity(stubProps, id)
}

describe('Entity unit tests', () => {
  let stubProps: StubProps
  let id: string

  beforeEach(() => {
    stubProps = userDataBuilder({})
    id = '698b0c7e-c68b-4cfd-99dd-aac08024be8d'
  })

  it('Should set props and id', () => {
    const entity = makeSut(stubProps)

    expect(entity.props).toStrictEqual(stubProps)
    expect(entity.id).not.toBeNull()
    expect(uuidValidate(entity.id)).toBeTruthy()
  })

  it('Should accept a valid uuid', () => {
    const entity = makeSut(stubProps, id)

    expect(uuidValidate(entity.id)).toBeTruthy()
    expect(entity.id).toBe(id)
  })

  it('Should convert a entity to a Javascript Object', () => {
    const entity = makeSut(stubProps, id)

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...stubProps
    })
  })
})
