import { generateId } from './generateId'
import { ValueObject } from './valueObject'

export class UuidBaseIdentity extends ValueObject {
  private _uuid: string

  protected constructor(uuid: string = '') {
    super()
    this._uuid = uuid
  }
  public static fromString(uuid: string) {
    return new UuidBaseIdentity(uuid)
  }

  public static nexIdentity() {
    return new UuidBaseIdentity(generateId())
  }

  public static fromUuid(uuid: string) {
    return new UuidBaseIdentity(uuid)
  }

  public __toString() {
    return this._uuid
  }
}
