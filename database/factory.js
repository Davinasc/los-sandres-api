'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/User/User', faker => {
  const firstName = faker.first()
  const lastName = faker.last()

  return {
    role_id: '1',
    first_name: firstName,
    last_name: lastName,
    username: `${firstName}${lastName}`.trim().toLowerCase(),
    email: `${faker.username()}@mail.com`,
    birthdate: faker.birthday({ string: true, american: false }),
    phone: faker.phone({ formatted: false }),
    gender: faker.gender({ extraGenders: ['Others'] })[0],
    password: '123123'
  }
})
