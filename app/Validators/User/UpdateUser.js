'use strict'

const Antl = use('Antl')

class UpdateUser {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      id: 'required|integer',
      first_name: 'string|min:2|max:80',
      last_name: 'string|min:2|max:80',
      email: 'email|max:255|unique:users',
      password: 'confirmed|min:6|max:40',
      phone: 'string|min:10|max:80',
      avatar_url: 'string|max:255',
      birthdate: 'date', // TODO: Validar com idade mínima de 10 anos
      gender: 'string|in:M,F,O'
    }
  }

  get data () {
    const { id } = this.ctx.params
    const requestBody = this.ctx.request.all()
    return { id, ...requestBody }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UpdateUser
