'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * BarberTransformer class
 *
 * @class BarberTransformer
 * @constructor
 */
class BarberTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (barber) {
    const jsonBarber = barber.toJSON()

    if (jsonBarber.user) {
      const newBarber = {
        ...jsonBarber,
        ...jsonBarber.user,
        user: undefined,
        user_id: undefined
      }
      return newBarber
    }

    if (jsonBarber.barber) {
      const newBarber = {
        ...jsonBarber,
        ...jsonBarber.barber,
        barber: undefined,
        user_id: undefined
      }
      return newBarber
    }
  }
}

module.exports = BarberTransformer
