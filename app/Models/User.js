'use strict'

const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', 'UserHook.hashPassword')
    this.addHook('beforeCreate', 'UserHook.generateUsername')

    this.addTrait('@provider:Lucid/SoftDeletes')
  }

  static get computed () {
    return ['fullname']
  }

  static get visible () {
    return [
      'id',
      'first_name',
      'last_name',
      'fullname',
      'username',
      'phone',
      'gender',
      'birthdate',
      'avatar_url'
    ]
  }

  static get casts () {
    return {
      id: 'string',
      first_name: 'string',
      last_name: 'string',
      username: 'string',
      phone: 'string',
      gender: 'string',
      birthdate: 'string',
      avatar_url: 'string'
    }
  }

  getFullname ({ first_name: firstName, last_name: lastName }) {
    return `${firstName} ${lastName}`
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
