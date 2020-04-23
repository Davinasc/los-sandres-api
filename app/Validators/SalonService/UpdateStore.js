'use strict'

const Antl = use('Antl')

class UpdateStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'string|min:2|max:100',
      description: 'string|min:5|max:512',
      price: 'number|min:0'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UpdateStore
