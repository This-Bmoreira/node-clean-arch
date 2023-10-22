import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { ClassValidatorFields } from './class-validator-field'

class StubRules {
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

  constructor (data: any) {
    Object.assign(this, data)
  }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
  validate (data: any): boolean {
    return super.validate(new StubRules(data))
  }
}

describe('ClassValidatorFields integration tests', () => {
  it('Should validate with errors', () => {
    const sut = new StubClassValidatorFields()

    expect(sut.validate(null)).toBeFalsy()
    expect(sut.errors).toStrictEqual({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters'
      ],
      email: [
        'email should not be empty',
        'email must be an email',
        'email must be a string',
        'email must be shorter than or equal to 255 characters'
      ],
      password: [
        'password should not be empty',
        'password must be a string',
        'password must be shorter than or equal to 100 characters'
      ]
    })
  })

  it('Should validate without errors', () => {
    const sut = new StubClassValidatorFields()

    expect(sut.validate({ name: 'any name', password: 'any-password', email: 'any@email.com' })).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(
      new StubRules({ name: 'any name', password: 'any-password', email: 'any@email.com' })
    )
  })
})
