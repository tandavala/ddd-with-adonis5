import User from 'App/Models/User'

export class BaseRepository<Entity> {
  private _model: any // typeof BaseModel
  private _modelDynamic: any //typeof BaseModel

  constructor(model: any) {
    this._model = model
  }

  public async getInstance() {
    this._modelDynamic = await import(`App/Models/${this._model}`)
  }

  public async create(obj: Entity) {
    return await this._modelDynamic.create(obj)
  }
}
