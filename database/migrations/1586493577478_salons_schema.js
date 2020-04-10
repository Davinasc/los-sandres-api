'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalonsSchema extends Schema {
  up () {
    this.create('salons', table => {
      table.increments()
      table
        .bigInteger('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
      table.string('name', 80).notNullable()
      table.string('email', 255).notNullable()
      table.string('phone', 80).notNullable()
      table.timestamps()
      table.timestamp('deleted_at')
    })
  }

  down () {
    this.drop('salons')
  }
}

module.exports = SalonsSchema
