const Route = use('Route')

Route.get('/', 'BarberController.index').as('index')

Route.post('/', 'BarberController.store')
  .as('store')
  .validator('User/StoreUser')

Route.get('/:id', 'BarberController.show')
  .as('show')
  .validator('Params/IdParam')

Route.put('/:id', 'BarberController.update')
  .as('update')
  .validator('User/UpdateUser')

Route.delete('/:id', 'BarberController.destroy')
  .validator('Params/IdParam')
  .as('destroy')

// TODO: Rota de avaliar barbeiro
