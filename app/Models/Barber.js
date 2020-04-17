'use strict'

const Model = use('Model')

class Barber extends Model {
  static boot () {
    super.boot()
  }

  static get primaryKey () {
    return 'user_id'
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Barber
