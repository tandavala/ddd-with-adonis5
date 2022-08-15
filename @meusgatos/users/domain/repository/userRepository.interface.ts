/* eslint-disable @typescript-eslint/naming-convention */
import { IFilter } from '@meusgatos/@shared/domain/interfaces/filter'
import { IPagination } from '@meusgatos/@shared/domain/interfaces/pagination'

export interface IUserRepository<T> {
  query(pagination: IPagination, filter: IFilter): void
  save(entity: T): Promise<T>
  findOne(uuid: string): Promise<T>
  update(entity: T): Promise<T>
  delete(id: string): Promise<void>
}
