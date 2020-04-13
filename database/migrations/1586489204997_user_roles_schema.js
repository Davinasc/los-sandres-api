'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserRolesSchema extends Schema {
  up () {
    this.create('user_roles', table => {
      table.increments()
      table
        .string('name', 80)
        .notNullable()
        .unique()
      table.timestamps()
      table.timestamp('deleted_at')
    })

    this.alter('users', table => {
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('user_roles')
        .onUpdate('CASCADE')
    })
  }

  down () {
    this.alter('users', table => {
      table.dropForeign('role_id')
      table.dropColumn('role_id')
    })

    this.drop('user_roles')
  }
}

module.exports = UserRolesSchema
