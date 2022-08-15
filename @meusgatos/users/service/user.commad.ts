export class UserCommand {
  private _userName: string
  private _email: string
  private _password: string

  constructor(requestBody: any) {
    this._userName = requestBody.userName
    this._email = requestBody.email
    this._password = requestBody.password
  }

  public get userName() {
    return this._userName
  }

  public get email() {
    return this._email
  }

  public get password() {
    return this._password
  }
}
