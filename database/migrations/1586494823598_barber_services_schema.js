'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BarberServicesSchema extends Schema {
  up () {
    this.create('barber_services', table => {
      table.increments()
      table
        .bigInteger('salon_service_id')
        .unsigned()
        .references('id')
        .inTable('salon_services')
        .onUpdate('CASCADE')
      table
        .bigInteger('barber_id')
        .unsigned()
        .references('user_id')
        .inTable('barbers')
        .onUpdate('CASCADE')
      table.timestamps()
      table.timestamp('deleted_at')
    })
  }

  down () {
    this.drop('barber_services')
  }
}

module.exports = BarberServicesSchema
