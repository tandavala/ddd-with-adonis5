import IDomainEvent from '../../../@shared/domain/event/domainEvent'
import verify from '../../../@shared/domain/verification/verify'
import { User } from '../aggregate/user'

export class CreateUserEvent implements IDomainEvent {
  private _userId: string
  private _occuradOn: Date
  private _topic: string

  private constructor(userId: string, occuredOn: Date, topic: string) {
    verify('Id', userId)
    verify('Topic', topic)
    this._userId = userId
    this._occuradOn = occuredOn
    this._topic = topic
  }

  public static fromUser(user: User) {
    return new CreateUserEvent(user.getId(), new Date(), 'UserCreated')
  }

  public getUserId() {
    return this._userId
  }

  public getOccuradOn() {
    return this._occuradOn
  }

  public getTopic() {
    return this._topic
  }
}
