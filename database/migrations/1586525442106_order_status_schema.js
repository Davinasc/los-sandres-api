'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderStatusSchema extends Schema {
  up () {
    this.create('order_statuses', table => {
      table.increments()
      table.string('name', 80)
      table.timestamps()
      table.timestamp('deleted_at')
    })
  }

  down () {
    this.drop('order_statuses')
  }
}

module.exports = OrderStatusSchema
