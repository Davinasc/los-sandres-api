const Route = use('Route')

Route.get('/', 'UserController.index').as('index')

Route.post('/', 'UserController.store')
  .as('store')
  .validator('User/StoreUser')

Route.get('/:id', 'UserController.show')
  .as('show')
  .as('show')
  .validator('Params/IdParam')

Route.put('/:id', 'UserController.update')
  .as('update')
  .validator(['User/UpdateUser'])

Route.delete('/:id', 'UserController.destroy')
  .validator('Params/IdParam')
  .as('destroy')

// TODO: Rota de confirmar e-mail

// TODO: Rota de tornar o usuário um barbeiro
