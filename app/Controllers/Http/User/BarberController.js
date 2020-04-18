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

  async store ({ request }) {
    const data = request.only([
      'first_name',
      'last_name',
      'email',
      'password',
      'phone',
      'avatar_url',
      'gender'
    ])

    const username = `${data.first_name}${data.last_name}`.toLowerCase().trim()

    const trx = await Database.beginTransaction()
    const user = await User.create({ ...data, username }, trx)
    const barber = await Barber.create({ user_id: user.id }, trx)
    await trx.commit()

    await barber.reload()

    return barber
  }

  async show ({ params, request, response, view }) {}

  async update ({ params, request, response }) {}

  async destroy ({ params, request, response }) {}
}

module.exports = BarberController
