import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserCommand } from '../../../@meusgatos/users/service/user.commad'
import { UserRepository } from '../../../@meusgatos/users/infrastructure/lucid-repository/userRepository'
import { UserService } from '../../../@meusgatos/users/service/user.service'

export default class UsersController {
  private userService: UserService

  constructor() {
    this.userService = new UserService(new UserRepository())
  }

  public async index({ request, response }: HttpContextContract) {
    const requestBody = request.all()
    try {
      const data = await this.userService.list()

      return response.status(201).json({ data })
    } catch (error: any) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const requestBody = request.all()
    try {
      this.userService = new UserService(new UserRepository())
      const command = new UserCommand(requestBody)
      const data = await this.userService.execute(command)

      return response.status(201).json({ message: 'created', data })
    } catch (error: any) {
      return response.status(400).json({ message: error.message })
    }
  }
}
