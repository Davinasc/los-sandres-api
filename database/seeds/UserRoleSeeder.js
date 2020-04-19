'use strict'

/*
|--------------------------------------------------------------------------
| UserRoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const UserRole = use('App/Models/UserRole')

class UserRoleSeeder {
  async run () {
    await UserRole.create({ id: 1, name: 'client' })
    await UserRole.create({ id: 2, name: 'admin' })
  }
}

module.exports = UserRoleSeeder
