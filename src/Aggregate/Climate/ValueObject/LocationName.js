const { StringValue, InvalidArgumentError } = require('ddd-js')

class LocationName extends StringValue {
  constructor (value) {
    super(value, false)

    if (!value.match(/^[a-z0-9]+/)) {
      throw new InvalidArgumentError('A location name must be lower-case alpha-numeric.')
    }
  }
}

module.exports = LocationName
