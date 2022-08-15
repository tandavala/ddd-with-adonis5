import User from 'App/Models/User'
import { User as Entity } from '../../domain/aggregate/user'
import { BaseRepository } from '../../../@shared/infrastructure/repository/base'
import { IUserRepository } from '@meusgatos/users/domain/repository/userRepository.interface'
import { IFilter } from '@meusgatos/@shared/domain/interfaces/filter'
import { IPagination } from '@meusgatos/@shared/domain/interfaces/pagination'

export class UserRepository implements IUserRepository<Entity> {
  constructor() {}

  public build() {
    return new UserRepository()
  }
  public async query(pagination: IPagination, filter: IFilter): Promise<void> {
    throw new Error('Method not implemented.')
  }
  public async save(entity: Entity): Promise<Entity> {
    const user = await User.create({
      userName: entity.getUserName(),
      email: entity.getEmailAddress(),
      password: entity.getPassword(),
    })
    /*   await this.create({
      userUsename: entity.getUserName(),
      email: entity.getEmailAddress(),
      password: entity.getPassword(),
    }) */
    return entity
  }
  public async findOne(uuid: string): Promise<Entity> {
    throw new Error('Method not implemented.')
  }
  public async update(entity: Entity): Promise<Entity> {
    throw new Error('Method not implemented.')
  }
  public async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
