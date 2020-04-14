'use strict'

const Model = use('Model')

class UserRole extends Model {
  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/SoftDeletes')
  }

  static get casts () {
    return { id: 'string' }
  }

  users () {
    return this.hasMany('App/Models/User')
  }
}

module.exports = UserRole
