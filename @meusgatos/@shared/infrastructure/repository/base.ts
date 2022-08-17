import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import { IFilter } from '@meusgatos/@shared/domain/interfaces/filter';
import { IPagination } from '@meusgatos/@shared/domain/interfaces/pagination';
import { BaseModel, LucidRow } from '@ioc:Adonis/Lucid/Orm';

export class BaseRepository<Dto> {
  private model: typeof BaseModel

  constructor(model: typeof BaseModel) {
    this.model = model
  }

  async findById(id: number, trx?: TransactionClientContract): Promise<LucidRow> {
    let data = await this.model.query(trx)
      .where('id', id)
      .andWhere('is_deleted', false)
      .first()
    if (!data) throw new Error('Data not found');
    return data;
  }

  async findAll(options?: {filter?: IFilter, pagination?: IPagination}): Promise<LucidRow[]> {
    let data = this.model.query()
      .where(function () {
        if (options?.filter) {
          options?.filter.searchBy.forEach((key, index) => {
            if (index === 0) {
              this.where(key, 'like', `%${options.filter?.search}%`);
              return;
            }
            this.orWhere(key, 'like', `%${options.filter?.search}%`);
          });
        }
      })
      .andWhere('is_deleted', options?.filter?.isDeleted?? false)
      .orderBy(options?.filter?.orderBy || 'id', options?.filter?.typeOrderBy || 'desc')
      .clone();
    if (options?.pagination) return data.paginate(options?.pagination.page, options?.pagination.perPage)

    return data
  }

  async create(dto: Dto, trx?: TransactionClientContract): Promise<LucidRow>{
    if (trx) {
      return await this.model.create(dto, { client: trx});
    } else {
      return await this.model.create(dto);
    }
  }

  async update(id: number, dto: Dto, withIsDeleted = true) {
    let modelResult = await this.model
      .query()
      .where((builder) => {
        builder.where('id', id);
        if (withIsDeleted) {
          builder.andWhere('is_deleted', false);
        }
      })
      .firstOrFail();

    modelResult.merge(dto)
    return await modelResult.save();
  }

  async delete(id: number, trx?: TransactionClientContract): Promise<void> {
    try {
      const modelResult = await this.findById(id)

      modelResult.merge({isDeleted: true})

      if (trx) {
        await modelResult.useTransaction(trx);
      } else {
        await modelResult.save();
      }

      return;
    } catch (err) {
      throw new Error('Não foi possível apagar! ' + err);
    }
  }

}
