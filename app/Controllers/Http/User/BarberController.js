'use strict'

const Barber = use('App/Models/Barber')
const User = use('App/Models/User')
const Database = use('Database')

/**
 * Resourceful controller for interacting with clients
 */
class BarberController {
  async index ({ request }) {
    const { page, perPage } = request.get()
    const defaultPerPage = perPage || 15

    const barbers = await Barber.query()
      .with('user')
      .paginate(page, defaultPerPage)
    return barbers
  }

  async store ({ request, response }) {}

  async show ({ params, request, response, view }) {}

  async update ({ params, request, response }) {}

  async destroy ({ params, request, response }) {}
}

module.exports = BarberController
