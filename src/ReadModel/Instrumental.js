const config = require('../config/config')
const { ReadModel } = require('ddd-js')
const I = require('instrumental-agent')

class Instrumental extends ReadModel {
  setup () {
    this.env = config.application.env
    this.readme = { message: 'The data of this read model is pushed on to https://instrumentalapp.com.' }

    I.configure({
      apiKey: config.instrumental.apiKey,
      enabled: true
    })

    this.registerEvent('ClimateData.dataUpdated', event => this.pushClimateToI(
      event.payload.locationName,
      event.payload.temperature,
      event.payload.humidity
    ))
  }

  /**
   * @param {string} locationName
   * @param {number} temperature
   * @param {number} humidity
   * @returns {Promise<void>}
   */
  async pushClimateToI (locationName, temperature, humidity) {
    this.logger.info({ locationName, temperature, humidity }, 'Publishing to I . . .')

    I.gauge(`${this.env}.damageReport.${locationName}.temperature`, temperature)
    I.gauge(`${this.env}.damageReport.${locationName}.humidity`, humidity)
  }
}

module.exports = Instrumental