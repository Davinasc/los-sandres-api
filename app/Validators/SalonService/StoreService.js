'use strict'

const Antl = use('Antl')

class StoreService {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|string|min:2|max:100',
      description: 'string|min:5|max:512',
      price: 'number|min:0'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = StoreService
