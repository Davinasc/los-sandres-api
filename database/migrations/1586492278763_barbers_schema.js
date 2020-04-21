'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BarbersSchema extends Schema {
  up () {
    this.create('barbers', table => {
      table
        .bigInteger('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .primary()
        .unique()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.float('average_rating', 1)
    })
  }

  down () {
    this.drop('barbers')
  }
}

module.exports = BarbersSchema
