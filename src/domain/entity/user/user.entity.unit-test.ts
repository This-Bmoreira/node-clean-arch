import { userDataBuilder } from '../../../shared/util/user/user-data-builder'
import { type UserProps } from '../../interface/user/user-entity.interface'
import { UserEntity } from './user.entity'

describe('UserEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    UserEntity.validate = jest.fn()
    props = userDataBuilder({})
    sut = new UserEntity(props)
  })

  it('Constructor method', () => {
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Getter of name field', () => {
    expect(sut.props.name).toBeDefined()
    expect(sut.props.name).toEqual(props.name)
    expect(typeof sut.props.name).toBe('string')
  })

  it('Getter of email field', () => {
    expect(sut.props.email).toBeDefined()
    expect(sut.props.email).toEqual(props.email)
    expect(typeof sut.props.email).toBe('string')
  })

  it('Getter of password field', () => {
    expect(sut.props.password).toBeDefined()
    expect(sut.props.password).toEqual(props.password)
    expect(typeof sut.props.password).toBe('string')
  })

  it('Getter of password field', () => {
    expect(sut.props.createdAt).toBeDefined()
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('updateName method', () => {
    const newName = 'new name'
    sut.updateName(newName)

    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.name).toEqual(newName)
  })

  it('updatePassword method', () => {
    const newPassword = 'new name'
    sut.updatePassword(newPassword)

    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.password).toEqual(newPassword)
  })
})
