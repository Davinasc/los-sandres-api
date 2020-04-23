'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

class BarberTransformer extends BumblebeeTransformer {
  transform (model) {
    const barber = model.toJSON()

    if (barber.user) {
      const tBarber = {
        ...barber,
        ...barber.user,
        user: undefined,
        user_id: undefined
      }
      return tBarber
    }

    if (barber.barber) {
      const tBarber = {
        ...barber,
        ...barber.barber,
        barber: undefined,
        user_id: undefined
      }
      return tBarber
    }
  }
}

module.exports = BarberTransformer
