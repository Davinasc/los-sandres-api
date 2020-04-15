'use strict'

const Route = use('Route')

const apiV1Group = group => {
  group.prefix('v1').as('v1')

  return group
}

apiV1Group(
  Route.get('/health', ({ response }) => {
    return response.json({ message: 'Ok' })
  })
)

apiV1Group(
  Route.group(() => {
    require('./user')
  })
    .namespace('User')
    .prefix('users')
    .as('user')
)
