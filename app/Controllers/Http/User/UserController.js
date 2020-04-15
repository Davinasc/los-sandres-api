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

  async store ({ request }) {
    const data = request.only(['first_name', 'last_name', 'email', 'password', 'role_id'])
    const username = `${data.first_name}${data.last_name}`.toLowerCase().trim()

    const trx = await Database.beginTransaction()
    const user = await User.create({ ...data, username }, trx)
    await trx.commit()

    await user.reload()

    return user
  }

  async show ({ params, response }) {
    try {
      const user = await User.find(params.id)

      if (!user) return response.status(400).json({ error: 'Usuário não encontrado' })

      return user
    } catch (err) {
      return response.status(err.status).send({ error: 'Erro ao buscar o usuário' })
    }
  }

  async update ({ params, request, response }) {}

  async destroy ({ params, response }) {
    const user = await User.find(params.id)

    if (!user) return response.status(400).json({ error: 'Usuário não encontrado' })

    user.delete()

    return response.status(204).send()
  }
}

module.exports = UserController
