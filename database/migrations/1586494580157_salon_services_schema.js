'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalonServicesSchema extends Schema {
  up () {
    this.create('salon_services', table => {
      table.bigIncrements()
      table
        .integer('salon_id')
        .unsigned()
        .references('id')
        .inTable('salons')
        .onUpdate('CASCADE')
      table.string('name', 100).notNullable()
      table.text('description', 512)
      table.float('price')
      table.timestamps()
      table.timestamp('deleted_at')
    })
  }

  down () {
    this.drop('salon_services')
  }
}

module.exports = SalonServicesSchema
