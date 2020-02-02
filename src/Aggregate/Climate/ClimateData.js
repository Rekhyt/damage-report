const { RootEntity, ValidationError } = require('ddd-js')
const LocationName = require('./ValueObject/LocationName')

class ClimateData extends RootEntity {
  setup () {
    this.registerCommand('ClimateData.updateData', async command => this.updateData(
      command.payload.locationName,
      command.payload.temperature,
      command.payload.humidity
    ))
  }

  /**
   * @param {string} rawLocationName
   * @param {number} temperature
   * @param {number} humidity
   * @returns {Promise<Event[]>}
   */
  async updateData (rawLocationName, temperature, humidity) {
    const validationError = new ValidationError()

    let locationName
    try {
      locationName = new LocationName(rawLocationName)
    } catch (err) {
      validationError.addInvalidField('locationName', err.message)
    }

    if (!temperature && temperature !== 0) {
      validationError.addInvalidField('temperature', `Must be a number, got ${temperature}.`)
    }

    if (!humidity && humidity !== 0) {
      validationError.addInvalidField('humidity', `Must be a number, got ${humidity}.`)
    }

    if (validationError.hasErrors()) throw validationError

    return [this.createEvent('ClimateData.dataUpdated', { locationName: locationName.getValue(), temperature, humidity })]
  }
}

module.exports = ClimateData
