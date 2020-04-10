'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalonBarbersSchema extends Schema {
  up () {
    this.create('salon_barbers', table => {
      table.increments()
      table
        .bigInteger('barber_id')
        .unsigned()
        .references('user_id')
        .inTable('barbers')
        .onUpdate('CASCADE')
      table
        .integer('salon_id')
        .unsigned()
        .references('id')
        .inTable('salons')
        .onUpdate('CASCADE')
      table.timestamps()
      table.timestamp('deleted_at')
    })
  }

  down () {
    this.drop('salon_barbers')
  }
}

module.exports = SalonBarbersSchema
