'use strict'

const User = use('App/Models/User/User')
const Database = use('Database')

// Shared
const addPaginationLinks = require('../../../../shared/utils/addPaginationLinks')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  async index ({ request, transform }) {
    const { page, perPage } = request.get()
    const defaultPerPage = perPage || 15
    const defaultPage = page || 1

    const users = await User.query()
      .clients()
      .paginate(defaultPage, defaultPerPage)

    const transformed = await transform.paginate(users, 'UserTransformer')
    transformed.pagination =
      addPaginationLinks(transformed, request.url()) || transformed.pagination

    return transformed
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

    // TODO: Adicionar internacionalização
    if (!user) return response.status(400).json({ message: 'O cliente não foi encontrado' })

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

    let user = await User.query()
      .where('id', params.id)
      .clients()
      .fetch()

    user = user.first()

    // TODO: Adicionar internacionalização
    if (!user) return response.status(400).json({ message: 'O cliente não foi encontrado' })

    const trx = await Database.beginTransaction()

    user.merge(data)
    await user.save(trx)

    trx.commit()

    return user
  }

  async destroy ({ params, response }) {
    let user = await User.query()
      .where('id', params.id)
      .clients()
      .fetch()

    user = user.first()

    // TODO: Adicionar internacionalização
    if (!user) return response.status(400).json({ message: 'O cliente não foi encontrado' })

    const trx = await Database.beginTransaction()
    await user.delete(trx)
    trx.commit()

    return response.status(204).send()
  }

  // TODO: Rota de confirmar e-mail

  // TODO: Rota de solicitar nova senha

  // TODO: Rota de atualizar a senha
}

module.exports = UserController
