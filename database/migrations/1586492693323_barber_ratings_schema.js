'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BarberRatingsSchema extends Schema {
  up () {
    this.create('barber_ratings', table => {
      table.bigIncrements()
      table
        .bigInteger('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
      table
        .bigInteger('barber_id')
        .unsigned()
        .references('user_id')
        .inTable('barbers')
        .onUpdate('CASCADE')
      table.float('rate', 1)
      table.text('comment', 512)
      table.timestamps()
      table.timestamp('deleted_at')
    })
  }

  down () {
    this.drop('barber_ratings')
  }
}

module.exports = BarberRatingsSchema
