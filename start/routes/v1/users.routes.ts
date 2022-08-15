import Route from '@ioc:Adonis/Core/Route'
import UsersController from 'App/Controllers/Http/UsersController'

export default function userRoutes() {
  Route.group(() => {
    Route.post('/', new UsersController().store)
  }).prefix('users')
  // .middleware("auth:api");
}
