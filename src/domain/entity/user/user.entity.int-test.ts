import { EntityValidationError } from '../../../shared/error/validation-error'
import { userDataBuilder } from '../../../shared/util/user/user-data-builder'
import { type UserProps } from '../../interface/user/user-entity.interface'
import { UserEntity } from './user.entity'

describe('UserEntity integration tests', () => {
  describe('Constructor method', () => {
    it('Should throw an error when creating a user with invalid name', () => {
      const invalidNames = [null, '', 10 as any]

      invalidNames.forEach((name) => {
        const props: UserProps = {
          ...userDataBuilder({}),
          name
        }
        expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
      })

      const tooLongName = 'a'.repeat(256)
      const props: UserProps = {
        ...userDataBuilder({}),
        name: tooLongName
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })
    it('Should throw an error when creating a user with invalid email', () => {
      const invalidEmail = [null, '', 10 as any]
      invalidEmail.forEach((email) => {
        const props: UserProps = {
          ...userDataBuilder({}),
          email
        }
        expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
      })

      const tooLongEmail = 'a'.repeat(256)
      const props: UserProps = {
        ...userDataBuilder({}),
        name: tooLongEmail
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })
    it('Should throw an error when creating a user with invalid password', () => {
      const invalidPassword = [null, '', 10 as any]
      invalidPassword.forEach((password) => {
        const props: UserProps = {
          ...userDataBuilder({}),
          password
        }
        expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
      })

      const tooLongPassword = 'a'.repeat(101)
      const props: UserProps = {
        ...userDataBuilder({}),
        password: tooLongPassword
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })
    it('Should throw an error when creating a user with invalid createAt', () => {
      const invalidCreatedAt = ['2023', 10 as any]
      invalidCreatedAt.forEach((createdAt) => {
        const props: UserProps = {
          ...userDataBuilder({}),
          createdAt
        }
        expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
      })
    })
    it('Should a valid user', () => {
      expect.assertions(0)
      const props: UserProps = {
        ...userDataBuilder({})
      }
      new UserEntity(props)
    })
  })
  describe('updateName', () => {
    it('Should throw an error when creating a user with invalid name', () => {
      const invalidNames = [null, '', 10 as any]

      invalidNames.forEach((name) => {
        const entity = new UserEntity(userDataBuilder({}))
        expect(() => { entity.updateName(name) }).toThrowError(EntityValidationError)
      })

      const tooLongName = 'a'.repeat(256)
      const props: UserProps = {
        ...userDataBuilder({}),
        name: tooLongName
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })
    it('Should a valid user', () => {
      expect.assertions(0)
      const props: UserProps = {
        ...userDataBuilder({})
      }
      const entity = new UserEntity(props)
      entity.updateName('other name')
    })
  })
  describe('updatePassword', () => {
    it('Should throw an error when creating a user with invalid password', () => {
      const invalidPassword = [null, '', 10 as any]
      invalidPassword.forEach((password) => {
        const entity = new UserEntity(userDataBuilder({}))
        expect(() => { entity.updatePassword(password) }).toThrowError(EntityValidationError)
      })
      const tooLongPassword = 'a'.repeat(101)
      const props: UserProps = {
        ...userDataBuilder({}),
        password: tooLongPassword
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })
    it('Should a valid user', () => {
      expect.assertions(0)
      const props: UserProps = {
        ...userDataBuilder({})
      }
      const entity = new UserEntity(props)
      entity.updatePassword('other password')
    })
  })
})
