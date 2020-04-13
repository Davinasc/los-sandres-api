'use strict'

const Route = use('Route')

Route.group(() => {
  Route.resource('users', 'UserController')
    .apiOnly()
    .validator(new Map([['users.store', 'User']]))
}).prefix('v1')
