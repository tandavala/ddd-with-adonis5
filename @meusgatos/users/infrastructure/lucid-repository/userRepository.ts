import User from 'App/Models/User'
import { User as Entity } from '../../domain/aggregate/user'
import { BaseRepository } from '../../../@shared/infrastructure/repository/base';
import { IUserRepository } from '@meusgatos/users/domain/repository/userRepository.interface'
// import { IFilter } from '@meusgatos/@shared/domain/interfaces/filter'
import { IPagination } from '@meusgatos/@shared/domain/interfaces/pagination'
import { UserDto } from '../../../@shared/infrastructure/dto/user.dto';

export class UserRepository extends BaseRepository<UserDto> implements IUserRepository<Entity> {

  constructor() {
    super(User)
  }

  saveUpdate(entity: Entity): Promise<Entity> {
    throw new Error('Method not implemented.');
  }
  findOne(uuid: string): Promise<Entity> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async query() {
    const p: IPagination = { page: 1, perPage: 2};
    return this.findAll({ pagination: p})
  }

  public async save(entity: Entity): Promise<any> {
      const data = await this.create({
        // uuid: entity.getId(),
        userName: entity.getUserName(),
        email: entity.getEmailAddress(),
        password: entity.getPassword()
      })
      return data
  }
}
