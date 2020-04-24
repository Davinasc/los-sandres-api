const Route = use('Route')

Route.get('/', 'SalonServiceController.index')
  .as('index')
  .validator('SalonService/ListSalonService')

Route.post('/', 'SalonServiceController.store')
  .as('store')
  .validator('SalonService/StoreService')

Route.get('/:id', 'SalonServiceController.show')
  .as('show')
  .validator('SalonService/SalonService')

Route.put('/:id', 'SalonServiceController.update')
  .as('update')
  .validator('SalonService/UpdateStore')

Route.delete('/:id', 'SalonServiceController.destroy')
  .as('destroy')
  .validator('SalonService/SalonService')
