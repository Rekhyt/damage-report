const { StringValue } = require('ddd-js')

class LocationName extends StringValue {
  constructor (value) {
    super(value, false)
  }
}

module.exports = LocationName
