'use strict'

const Barber = use('App/Models/Barber')
const User = use('App/Models/User')
const Database = use('Database')

// Shared
const addPaginationLinks = require('../../../../shared/utils/addPaginationLinks')

/**
 * Resourceful controller for interacting with clients
 */
class BarberController {
  async index ({ request, transform }) {
    const { page, perPage } = request.get()
    const defaultPerPage = perPage || 15
    const defaultPage = page || 1

    const barbers = await Barber.query()
      .with('user')
      .paginate(defaultPage, defaultPerPage)

    const transformed = await transform.paginate(barbers, 'BarberTransformer')
    transformed.pagination = addPaginationLinks(transformed, request.url())

    return transformed
  }

  async store ({ request, transform }) {
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

    let barber = await User.create({ ...data, username }, trx)
    barber = await barber.barber().create({ user_id: barber.id }, trx)

    await trx.commit()

    // TODO: Adicionar envio de e-mail para o usuário na fila

    await barber.reload()
    await barber.load('user')

    return transform.item(barber, 'BarberTransformer')
  }

  async show ({ params, response, transform }) {
    let barber = await Barber.query()
      .where('user_id', params.id)
      .with('user')
      .fetch()

    barber = barber.first()

    // TODO: Adicionar internacionalização
    if (!barber) return response.status(400).json({ error: 'O barbeiro não foi encontrado' })

    return transform.item(barber, 'BarberTransformer')
  }

  async update ({ params, request, response, transform }) {
    const data = request.only([
      'first_name',
      'last_name',
      'email',
      'phone',
      'avatar_url',
      'birthdate',
      'gender'
    ])

    const barber = await User.find(params.id)

    // TODO: Adicionar internacionalização
    if (!barber) return response.status(400).json({ error: 'O barbeiro não foi encontrado' })

    barber.merge(data)
    await barber.save()
    await barber.load('barber')

    return transform.item(barber, 'BarberTransformer')
  }

  async destroy ({ params, response }) {
    let barber = await Barber.query()
      .where('user_id', params.id)
      .with('user')
      .fetch()

    barber = barber.first()

    // TODO: Adicionar internacionalização
    if (!barber) return response.status(400).json({ error: 'O barbeiro não foi encontrado' })

    await barber.delete()
    await barber.user().delete()

    return response.status(204).send()
  }
}

module.exports = BarberController
