'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SalonService extends Model {
  static boot () {
    super.boot()
  }

  static get hidden () {
    return ['salon_id', 'deleted_at', 'created_at', 'updated_at']
  }

  salon () {
    return this.belongsTo('App/Models/Salon/Salon')
  }
}

module.exports = SalonService
