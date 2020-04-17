const Env = use('Env')

module.exports = {
  devEnv: Env.get('NODE_ENV') === 'development'
}
