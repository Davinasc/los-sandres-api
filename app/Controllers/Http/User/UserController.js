'use strict'

const User = use('App/Models/User')
const Database = use('Database')
const userRoles = require('../../../Shared/Constants/UserRoles')

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
    const role = userRoles.client

    const trx = await Database.beginTransaction()
    const user = await User.create({ ...data, username, role_id: role }, trx)
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

  async update ({ params, request, response }) {
    try {
      const data = request.only([
        'first_name',
        'last_name',
        'email',
        'role_id',
        'phone',
        'avatar_url',
        'birthdate',
        'gender'
      ])

      const user = await User.find(params.id)

      if (!user) return response.status(400).json({ error: 'Usuário não encontrado' })

      user.merge(data)
      await user.save()

      return user
    } catch (err) {
      return response.status(err.status).send({ error: 'Erro ao atualizar o usuário' })
    }
  }

  async destroy ({ params, response }) {
    const user = await User.find(params.id)

    if (!user) return response.status(400).json({ error: 'Usuário não encontrado' })

    user.delete()

    return response.status(204).send()
  }

  // TODO: Rota de confirmar e-mail

  // TODO: Rota de solicitar nova senha

  // TODO: Rota de atualizar a senha
}

module.exports = UserController
