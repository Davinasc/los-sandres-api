'use strict'

const Route = use('Route')

const apiV1Group = group => group.prefix('v1').as('v1')

apiV1Group(Route.get('/health', ({ response }) => response.json({ message: 'Ok' })))

// TODO: Adicionar middleware de autenticação & autorização

// TODO: Adicionar forma de cadastrar endereços

// Clients
apiV1Group(
  Route.group(() => require('./user/user'))
    .namespace('User')
    .prefix('users')
    .as('user')
)

// Barbers
apiV1Group(
  Route.group(() => require('./user/barber'))
    .namespace('User')
    .prefix('barbers')
    .as('barber')
)

// Salon
apiV1Group(
  Route.group(() => require('./salon/salon'))
    .namespace('Salon')
    .prefix('salons')
    .as('salon')
)

// Salon Services
apiV1Group(
  Route.group(() => require('./salon/salonServices'))
    .namespace('Salon')
    .prefix('salons/:salonId/services')
    .as('salonServices')
)
