'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class CustomValidatorProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    const Validator = use('Validator')
    const exists = require('./Validators/ExistsValidator')

    Validator.extend('exists', exists)
  }
}

module.exports = CustomValidatorProvider
