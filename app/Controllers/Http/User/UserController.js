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

    const users = await User.query()
      .clients()
      .paginate(page, defaultPerPage)
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

    const trx = await Database.beginTransaction()
    const user = await User.create({ ...data, username }, trx)
    await trx.commit()

    // TODO: Adicionar envio de e-mail para o usuário na fila

    await user.reload()

    return user
  }

  async show ({ params, response }) {
    let user = await User.query()
      .where('id', params.id)
      .clients()
      .fetch()

    user = user.first()

    if (!user) return response.status(400).json({ error: 'O usuário não foi encontrado' })

    return user
  }

  async update ({ params, request, response }) {
    const data = request.only([
      'first_name',
      'last_name',
      'email',
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
