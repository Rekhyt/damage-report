const { RootEntity, ValidationError } = require('ddd-js')
const LocationId = require('./ValueObject/LocationId')
const LocationName = require('./ValueObject/LocationName')

class ClimateData extends RootEntity {
  setup () {
    this.registerCommand('ClimateData.updateData', async command => this.updateData(
      command.payload.locationId,
      command.payload.locationName,
      command.payload.temperature,
      command.payload.humidity
    ))
  }

  /**
   * @param {string} rawLocationId
   * @param {string} rawLocationName
   * @param {number} temperature
   * @param {number} humidity
   * @returns {Promise<Event[]>}
   */
  async updateData (rawLocationId, rawLocationName, temperature, humidity) {
    this.logger.info({ rawLocationId, rawLocationName, temperature, humidity }, 'Validating command . . .')
    const validationError = new ValidationError()

    let locationId
    try {
      locationId = new LocationId(rawLocationId)
    } catch (err) {
      validationError.addInvalidField('locationId', err.message)
    }

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

    return [this.createEvent('ClimateData.dataUpdated', {
      locationId: locationId.getValue(),
      locationName: locationName.getValue(),
      temperature,
      humidity,
      lastUpdated: Date.now()
    })]
  }
}

module.exports = ClimateData
