import { type UserProps } from '../../interface/user/user-entity.interface'
import { Entity } from '../entity'

export class UserEntity extends Entity<UserProps> {
  constructor (public readonly props: UserProps, id?: string) {
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
    this.name = value
  }

  updatePassword (value: string): void {
    this.password = value
  }
}
