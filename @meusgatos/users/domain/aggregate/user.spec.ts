import { EmailAddress } from '../valueObject/emailAddress'
import { Password } from '../valueObject/password'
import { UserId } from '../valueObject/userId'
import { UserName } from '../valueObject/userName'
import { User } from './user'

describe('User unit test', () => {
  it('should throw erro if is empty', () => {
    expect(() => {
      User.create(
        UserId.fromString(''),
        UserName.pick('tandavala'),
        EmailAddress.pick('jose.tandavala@gmail.com'),
        Password.pick('123456')
      )
    }).toThrowError('Id is required')
  })
})
