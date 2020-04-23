'use strict'

const Salon = use('App/Models/Salon/Salon')
const SalonService = use('App/Models/Salon/SalonService')
const Database = use('Database')

// Shared
const addPaginationLinks = require('../../../../shared/utils/addPaginationLinks')

class SalonServiceController {
  async index ({ request, transform }) {
    const { page, perPage } = request.get()
    const defaultPerPage = perPage || 15
    const defaultPage = page || 1

    const barbers = await SalonService.query()
      .with('salon')
      .paginate(defaultPage, defaultPerPage)

    const transformed = await transform.paginate(barbers, 'SalonServiceTransformer')
    transformed.pagination = addPaginationLinks(transformed, request.url())

    return transformed
  }

  async store ({ request, params, response, transform }) {
    const data = request.only(['name', 'description', 'price'])

    const trx = await Database.beginTransaction()

    const salon = await Salon.find(params.salonId)

    if (!salon) return response.status(400).json({ error: 'O salão não foi encontrado' })

    const service = await salon.services().create(data, trx)

    await trx.commit()

    await service.reload()
    await service.load('salon')

    return transform.item(service, 'SalonServiceTransformer')
  }

  async show ({ params, response, transform }) {
    let service = await SalonService.query()
      .where('id', params.id)
      .where('salon_id', params.salonId)
      .with('salon')
      .fetch()

    service = service.first()

    // TODO: Adicionar internacionalização
    if (!service) return response.status(400).json({ error: 'O serviço não foi encontrado' })

    return transform.item(service, 'SalonServiceTransformer')
  }

  async update ({ params, request, response, transform }) {
    const data = request.only(['name', 'description', 'price'])

    let service = await SalonService.query()
      .where('id', params.id)
      .where('salon_id', params.salonId)
      .with('salon')
      .fetch()

    service = service.first()

    if (!service) return response.status(400).json({ error: 'O serviço não foi encontrado' })

    const trx = await Database.beginTransaction()

    service.merge(data)
    await service.save(trx)

    await trx.commit()

    return transform.item(service, 'SalonServiceTransformer')
  }

  async destroy ({ params, response }) {
    let service = await SalonService.query()
      .where('id', params.id)
      .where('salon_id', params.salonId)
      .with('salon')
      .fetch()

    service = service.first()

    // TODO: Adicionar internacionalização
    if (!service) return response.status(400).json({ error: 'O serviço não foi encontrado' })

    const trx = await Database.beginTransaction()

    await service.delete(trx)

    trx.commit()

    return response.status(204).send()
  }
}

module.exports = SalonServiceController
