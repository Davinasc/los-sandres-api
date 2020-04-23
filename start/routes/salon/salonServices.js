const Route = use('Route')

Route.get('/', 'SalonServiceController.index').as('index')

Route.post('/', 'SalonServiceController.store')
  .as('store')
  .validator('SalonService/StoreService')

Route.get('/:id', 'SalonServiceController.show')
  .as('show')
  .validator('Params/IdParam')

Route.put('/:id', 'SalonServiceController.update')
  .as('update')
  .validator('SalonService/UpdateStore')

Route.delete('/:id', 'SalonServiceController.destroy')
  .validator('Params/IdParam')
  .as('destroy')
