'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Youch = use('Youch')
const { devEnv } = require('../../shared/utils/env')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    if (devEnv) {
      const youch = new Youch(error, request.request)
      const errJson = await youch.toJSON()
      return response.status(error.status).send(errJson)
    }

    if (error.status === 500) {
      return response
        .status(500)
        .send({ message: 'Houve um erro no servidor, tente novamente em instantes' })
    }

    return response.status(error.status)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
    console.log(error)
  }
}

module.exports = ExceptionHandler
