'use strict'

const Antl = use('Antl')

class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      first_name: 'required|string|min:2',
      last_name: 'required|string|min:2',
      email: 'required|email|unique:users',
      password: 'required|confirmed',
      role_id: 'required|exists:user_roles,id'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = User
