'use strict'

const Model = use('Model')

class Barber extends Model {
  static boot () {
    super.boot()
  }

  static get primaryKey () {
    return 'user_id'
  }

  static get createdAtColumn () {
    return null
  }

  static get updatedAtColumn () {
    return null
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Barber
