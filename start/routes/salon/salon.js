const Route = use('Route')

Route.post('/', 'SalonController.store')
  .as('store')
  .validator('Salon/StoreSalon')

Route.get('/', 'SalonController.show').as('show')

Route.put('/:id', 'SalonController.update')
  .as('update')
  .validator('Salon/UpdateSalon')
