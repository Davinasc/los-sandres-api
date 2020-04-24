'use strict'

const Antl = use('Antl')

class UpdateService {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      salonId: 'required|integer',
      id: 'required|integer',
      name: 'string|min:2|max:100',
      description: 'string|min:5|max:512',
      price: 'number|min:0'
    }
  }

  get data () {
    const { salonId, id } = this.ctx.params
    const requestBody = this.ctx.request.all()
    return { salonId, id, ...requestBody }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UpdateService
