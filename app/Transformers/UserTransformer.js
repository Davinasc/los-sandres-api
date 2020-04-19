'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

class UserTransformer extends BumblebeeTransformer {
  transform (model) {
    return model
  }
}

module.exports = UserTransformer
