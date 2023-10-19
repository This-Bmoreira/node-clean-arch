import { v4 as uuidv4 } from 'uuid'
import { MissingPropertyError } from './error/missing-property-error'

export abstract class Entity<Props = unknown> {
  public readonly id: string
  public readonly props: Props

  constructor (props: Props, id?: string) {
    this.props = props
    this.id = id ?? uuidv4()
  }

  getId (): string {
    return this.id
  }

  toJSON (): Required<{ id: string } & Props> {
    const toJSONResult: { id: string } & Props = {
      id: this.id,
      ...this.props
    }
    if (Object.values(toJSONResult).some(value => value === undefined)) {
      throw new MissingPropertyError()
    }
    return toJSONResult as Required<{ id: string } & Props>
  }
}
