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

const Factory = use('Factory')
const Database = use('Database')

class UserRoleSeeder {
  async run () {
    await Factory.model('App/Models/UserRole').create()

    const userRoles = await Database.table('user_roles')
    console.log(userRoles)
  }
}

module.exports = UserRoleSeeder
