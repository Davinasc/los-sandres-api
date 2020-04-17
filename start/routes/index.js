'use strict'

const Route = use('Route')

const apiV1Group = group => group.prefix('v1').as('v1')

apiV1Group(Route.get('/health', ({ response }) => response.json({ message: 'Ok' })))

// TODO: Adicionar middleware de autenticação & autorização

apiV1Group(
  Route.group(() => require('./user'))
    .namespace('User')
    .prefix('users')
    .as('user')
)

apiV1Group(
  Route.group(() => require('./barber'))
    .namespace('User')
    .prefix('barbers')
    .as('barber')
)
