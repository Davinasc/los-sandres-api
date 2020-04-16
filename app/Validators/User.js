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
      password: 'required|confirmed|min:6|max:40',
      role_id: 'exists:user_roles,id',
      phone: 'string|min:10',
      avatar_url: 'string',
      birthdate: 'date', // TODO: Validar com idade mínima de 10 anos
      gender: 'string|in:M,F,O'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = User
