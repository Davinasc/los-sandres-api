'use strict'

const Antl = use('Antl')

class SalonService {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      salonId: 'required|integer',
      id: 'required|integer'
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

module.exports = SalonService
