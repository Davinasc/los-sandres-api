'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', table => {
      table
        .bigIncrements()
        .primary()
        .unsigned()
        .notNullable()
      table.string('first_name', 80).notNullable()
      table.string('last_name', 80).notNullable()
      table
        .string('username', 80)
        .notNullable()
        .unique()
      table
        .string('email', 255)
        .notNullable()
        .unique()
      table.string('password', 60).notNullable()
      table.enu('gender', ['M', 'F', 'O'])
      table
        .boolean('email_confirmed')
        .notNullable()
        .defaultTo(false)
      table.string('phone', 80)
      table.string('avatar_url', 255)
      table.timestamps()
      table.timestamp('deleted_at')
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
