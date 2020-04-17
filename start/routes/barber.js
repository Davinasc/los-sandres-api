const Route = use('Route')

Route.get('/', 'BarberController.index').as('index')

Route.post('/', 'BarberController.store')
  .as('store')
  .validator('User')

Route.get('/:id', 'BarberController.show')
  .as('show')
  .validator('Params/IdParam')

Route.put('/:id', 'BarberController.update')
  .as('update')
  .validator(['Params/IdParam', 'User'])

Route.delete('/:id', 'BarberController.destroy')
  .validator('Params/IdParam')
  .as('destroy')

// TODO: Rota de avaliar barbeiro
