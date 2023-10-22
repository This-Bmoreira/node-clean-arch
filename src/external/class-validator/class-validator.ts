/* eslint-disable @typescript-eslint/no-extraneous-class */
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { type UserProps } from '../../domain/interface/user/user-entity.interface'
import { ClassValidatorFields } from '../../shared/util/validator/class-validator-field'

export class UserRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
    name: string

  @MaxLength(255)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
    email: string

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
    password: string

  @IsDate()
  @IsOptional()
    createdAt?: Date

  constructor ({ email, name, password, createdAt }: UserProps) {
    Object.assign(this, { email, name, password, createdAt })
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate (data: UserRules): boolean {
    return super.validate(new UserRules(data))
  }
}

export class UserValidatorFactory {
  static create (): UserValidator {
    return new UserValidator()
  }
}
