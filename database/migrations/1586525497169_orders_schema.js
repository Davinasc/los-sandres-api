'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.create('orders', table => {
      table.bigIncrements()
      table
        .bigInteger('salon_id')
        .unsigned()
        .references('id')
        .inTable('salons')
        .onUpdate('CASCADE')
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
      table
        .integer('status_id')
        .unsigned()
        .references('id')
        .inTable('order_statuses')
        .onUpdate('CASCADE')
      table.timestamp('start_date')
      table.timestamp('end_date')
      table.timestamps()
      table.timestamp('deleted_at')
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrdersSchema
