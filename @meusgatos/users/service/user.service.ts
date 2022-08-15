import { User } from '../domain/aggregate/user'
import { EmailAddress } from '../domain/valueObject/emailAddress'
import { Password } from '../domain/valueObject/password'
import { UserId } from '../domain/valueObject/userId'
import { UserName } from '../domain/valueObject/userName'
import { UserRepository } from '../infrastructure/lucid-repository/userRepository'
import { UserCommand } from './user.commad'

export class UserService {
  constructor(private userRepository: UserRepository) {
    this.userRepository.build()
  }

  public async execute(command: UserCommand) {
    const user = User.create(
      UserId.nexIdentity(),
      UserName.pick(command.userName),
      EmailAddress.pick(command.email),
      Password.pick(command.password)
    )
    return await this.userRepository.save(user)
  }
}
