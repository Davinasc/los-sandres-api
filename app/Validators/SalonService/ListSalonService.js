'use strict'

const Antl = use('Antl')

class SalonService {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      salonId: 'required|integer'
    }
  }

  get data () {
    const { salonId } = this.ctx.params
    const requestBody = this.ctx.request.all()
    return { salonId, ...requestBody }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = SalonService
