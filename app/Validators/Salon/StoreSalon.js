'use strict'

const Antl = use('Antl')

class Salon {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|string|min:2|max:80',
      email: 'email|max:255|unique:salons',
      phone: 'string|min:10|max:80'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Salon
