'use strict'

class IdParam {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      id: 'required|integer'
    }
  }

  get data () {
    const { id } = this.ctx.params
    const requestBody = this.ctx.request.all()
    return { id, ...requestBody }
  }
}

module.exports = IdParam
