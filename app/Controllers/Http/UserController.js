'use strict'

const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  async index ({ request, response }) {}

  async store ({ request, response }) {
    const data = request.only(['first_name', 'last_name', 'email', 'password'])
    const username = `${data.first_name}${data.last_name}`.toLowerCase()
    const user = await User.create({ ...data, username })
    return user
  }

  async show ({ params, request, response, view }) {}

  async update ({ params, request, response }) {}

  async destroy ({ params, request, response }) {}
}

module.exports = UserController
