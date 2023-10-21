import { validateSync } from 'class-validator'
import { type FieldsErrors, type ValidatorFieldsInterface } from '../../../adapter/gateways/validator-field.interface'

export abstract class ClassValidatorFields<PropsValidated>
implements ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors | null = null
  validatedData: PropsValidated | null = null

  validate (data: any): boolean {
    const errors = validateSync(data)
    if (errors.length > 0) {
      this.errors = {}
      for (const error of errors) {
        const field = error.property
        if (error.constraints !== undefined) {
          this.errors[field] = Object.values(error.constraints)
        } else {
          this.errors[field] = []
        }
      }
    } else {
      this.validatedData = data
    }
    return errors.length === 0
  }
}
