import { UserValidatorFactory } from '../../../external/class-validator/class-validator'
import { EntityValidationError } from '../../../shared/error/validation-error'
import { type UserProps } from '../../interface/user/user-entity.interface'
import { Entity } from '../entity'

export class UserEntity extends Entity<UserProps> {
  constructor (public readonly props: UserProps, id?: string) {
    UserEntity.validate(props)
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? new Date()
  }

  get name (): string {
    return this.props.name
  }

  private set name (value: string) {
    this.props.name = value
  }

  get email (): string {
    return this.props.email
  }

  set email (value: string) {
    this.props.email = value
  }

  get password (): string {
    return this.props.password
  }

  private set password (value: string) {
    this.props.password = value
  }

  get createdAt (): Date | undefined {
    return this.props.createdAt
  }

  set createdAt (value: Date | undefined) {
    this.props.createdAt = value
  }

  updateName (value: string): void {
    UserEntity.validate({ ...this.props, name: value })
    this.name = value
  }

  updatePassword (value: string): void {
    UserEntity.validate({ ...this.props, password: value })
    this.password = value
  }

  static validate (props: UserProps): void {
    const validator = UserValidatorFactory.create()
    const isValid = validator.validate(props)
    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }
}
