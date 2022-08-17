import Route from '@ioc:Adonis/Core/Route'
// import UsersController from 'App/Controllers/Http/UsersController'

export default function userRoutes() {
  Route.group(() => {
    Route.get('/', 'UsersController.index')
    Route.post('/', 'UsersController.store')
  }).prefix('users')
  // .middleware("auth:api");
}
