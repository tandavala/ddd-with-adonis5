import verify from '../../../@shared/domain/verification/verify'
import { ValueObject } from '../../../@shared/domain/common/valueObject'

export class Password extends ValueObject {
  private _password: string

  private constructor(password: string) {
    super()
    this.setPassword(password)
  }
  private setPassword(password: string) {
    this.assertNotEmpty(password)
  }

  public static pick(password: string) {
    return new Password(password)
  }

  private assertNotEmpty(password: string) {
    verify('Username', password)
    this._password = password
  }

  public __toString() {
    return this._password
  }
}
