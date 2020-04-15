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
    const requestBody = this.ctx.request.all()
    const id = this.ctx.params.id

    return Object.assign({}, requestBody, { id })
  }
}

module.exports = IdParam
