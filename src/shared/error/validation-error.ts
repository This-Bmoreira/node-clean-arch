/* eslint-disable n/handle-callback-err */
import { type FieldsErrors } from '../../adapter/gateways/validator-field.interface'

export class ValidationError extends Error { }

export class EntityValidationError extends Error {
  constructor (public error: FieldsErrors) {
    super('Entity Validation Error')
    this.name = 'EntityValidationError'
  }
}
