'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderServicesSchema extends Schema {
  up () {
    this.create('order_services', table => {
      table.bigIncrements()
      table
        .bigInteger('order_id')
        .unsigned()
        .references('id')
        .inTable('orders')
        .onUpdate('CASCADE')
      table
        .bigInteger('barber_service_id')
        .unsigned()
        .references('id')
        .inTable('barber_services')
        .onUpdate('CASCADE')
      table.integer('quantity')
      table.float('unit_price')
      table.float('price')
      table.timestamps()
      table.timestamp('deleted_at')
    })
  }

  down () {
    this.drop('order_services')
  }
}

module.exports = OrderServicesSchema
