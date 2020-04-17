'use strict'

const Antl = use('Antl')

class Barber {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      average_rating: 'required|number|min:1|max:5'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Barber
