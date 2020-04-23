'use strict'

const Salon = use('App/Models/Salon/Salon')
const User = use('App/Models/User/User')
const Database = use('Database')

class SalonController {
  async store ({ request }) {
    const data = request.only(['name', 'email', 'phone'])

    // TODO: Pegar o usuário logado
    const user = await User.find(1)

    const trx = await Database.beginTransaction()

    const salon = await user.salons().create({ ...data, created_by_user: user.id }, trx)

    await trx.commit()

    // TODO: Adicionar envio de e-mail para o salão na fila

    await salon.reload()

    return salon
  }

  async show ({ params, request, response }) {
    // TODO: Pegar o usuário logado
    const salon = await Salon.query()
      .where('user_id', 1)
      .first()

    // TODO: Adicionar internacionalização
    if (!salon) return response.status(400).json({ error: 'O salão não foi encontrado' })

    return salon
  }

  async update ({ params, request, response }) {
    const data = request.only(['name', 'email', 'phone'])

    // TODO: Pegar o usuário logado
    const salon = await Salon.query()
      .where('user_id', 1)
      .where('id', params.id)
      .first()

    // TODO: Adicionar internacionalização
    if (!salon) return response.status(400).json({ error: 'O salão não foi encontrado' })

    salon.merge(data)
    await salon.save()

    return salon
  }
}

module.exports = SalonController
