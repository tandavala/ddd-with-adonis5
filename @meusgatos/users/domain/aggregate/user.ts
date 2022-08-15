import verify from '../../../@shared/domain/verification/verify'
import { TriggerEvents } from '../../../@shared/infrastructure/event/triggerEvent'
import { CreateUserEvent } from '../event/createUserEvent'
import { EmailAddress } from '../valueObject/emailAddress'
import { Password } from '../valueObject/password'
import { UserId } from '../valueObject/userId'
import { UserName } from '../valueObject/userName'

export class User extends TriggerEvents {
  private _uuid: string
  private _userName: string
  private _email: string
  private _password: string
  private _isDeleted: boolean

  private constructor(
    uuid: string,
    userName: string,
    email: string,
    password: string,
    isDeleted: boolean
  ) {
    super()
    this.setId(uuid)
    this.setUserName(userName)
    this.setEmailAddress(email)
    this.setPassword(password)
    this._isDeleted = isDeleted

    this.notifyDomainEvent(this.buildNewUserDomainEvent())
  }

  public static create(
    userId: UserId,
    userName: UserName,
    emailAddress: EmailAddress,
    password: Password
  ) {
    return new User(
      userId.__toString(),
      userName.__toString(),
      emailAddress.__toString(),
      password.__toString(),
      false
    )
  }

  protected buildNewUserDomainEvent(): CreateUserEvent {
    return CreateUserEvent.fromUser(this)
  }

  public setId(uuid: string) {
    verify('Id', uuid)
    this._uuid = uuid
  }

  public getId() {
    return this._uuid
  }

  public setUserName(userName: string) {
    verify('Username', userName)
    this._userName = userName
  }

  public getUserName() {
    return this._userName
  }

  public setEmailAddress(emailAddress: string) {
    verify('Email', emailAddress)
    this._email = emailAddress
  }

  public getEmailAddress() {
    return this._email
  }

  public setPassword(password: string) {
    verify('Password', password)
    this._password = password
  }

  public getPassword() {
    return this._password
  }

  public getIsDeleted() {
    return this._isDeleted
  }

  public softDeletedAccount() {
    this._isDeleted = true
  }

  public restoreAccount() {
    this._isDeleted = false
  }
}
