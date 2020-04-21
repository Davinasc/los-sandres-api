'use strict'

const Antl = use('Antl')

class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      first_name: 'required|string|min:2|max:80',
      last_name: 'required|string|min:2|max:80',
      email: 'required|email|max:255|unique:users',
      password: 'required|confirmed|min:6|max:40',
      phone: 'string|min:10|max:80',
      avatar_url: 'string|max:255',
      birthdate: 'date', // TODO: Validar com idade mínima de 10 anos
      gender: 'string|in:M,F,O'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = User
