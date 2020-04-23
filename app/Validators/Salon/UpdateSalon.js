'use strict'

const Antl = use('Antl')

class UpdateSalon {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      id: 'required|integer',
      name: 'string|min:2|max:80',
      email: 'email|max:255|unique:salons',
      phone: 'string|min:10|max:80'
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

module.exports = UpdateSalon
