'use strict'

const User = use('App/Models/User')
const Database = use('Database')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  async index ({ request }) {
    const { page, perPage } = request.get()

    const defaultPerPage = perPage || 15

    const users = await User.query().paginate(page, defaultPerPage)

    return users
  }

  async store ({ request, response }) {
    const trx = await Database.beginTransaction()

    try {
      const data = request.only(['first_name', 'last_name', 'email', 'password', 'role_id'])
      const username = `${data.first_name}${data.last_name}`.toLowerCase()

      const user = await User.create({ ...data, username }, trx)

      trx.commit()
      return response.status(201).json(user)
    } catch (err) {
      trx.rollback()
    }
  }

  async show ({ params, request, response, view }) {}

  async update ({ params, request, response }) {}

  async destroy ({ params, request, response }) {}
}

module.exports = UserController
