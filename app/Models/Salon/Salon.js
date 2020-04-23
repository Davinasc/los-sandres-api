'use strict'

const Model = use('Model')

class Salon extends Model {
  static boot () {
    super.boot()
  }

  static get hidden () {
    return ['user_id', 'created_by_user']
  }

  static scopeUserSalon (query) {
    return query.doesntHave('barber')
  }

  user () {
    return this.belongsTo('App/Models/User/User')
  }
}

module.exports = Salon
