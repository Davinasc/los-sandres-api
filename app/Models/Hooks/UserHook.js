'use strict'

const Hash = use('Hash')
const User = use('App/Models/User')
const { v4: uuid } = require('uuid')

const UserHook = (exports = module.exports = {})

UserHook.hashPassword = async user => {
  if (user.dirty.password) {
    user.password = await Hash.make(user.password)
  }
}

UserHook.generateUsername = async user => {
  const dbUser = await User.findBy('username', user.username)
  if (!dbUser) return

  let i = 0
  while (i === 0) {
    user.username = `${user.username}${uuid()}`.toLowerCase()
    const hasUser = await User.findBy('username', user.username)
    if (hasUser) continue
    i++
  }

  return user
}
