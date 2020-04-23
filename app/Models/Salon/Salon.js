'use strict'

const Model = use('Model')

class Salon extends Model {
  static boot () {
    super.boot()
  }

  static get hidden () {
    return ['user_id', 'created_by_user', 'deleted_at', 'created_at', 'updated_at']
  }

  user () {
    return this.belongsTo('App/Models/User/User')
  }

  services () {
    return this.hasMany('App/Models/Salon/SalonService')
  }
}

module.exports = Salon
