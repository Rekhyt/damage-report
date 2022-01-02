const { ReadModel } = require('ddd-js')

class Dashboard extends ReadModel {
  setup () {
    this._data = {
      locationClimate: {}
    }

    this.registerEvent('ClimateData.dataUpdated', event => this.updateData(
      event.payload.locationId,
      event.payload.locationName,
      event.payload.temperature,
      event.payload.humidity,
      event.payload.lastUpdated
    ))
  }

  get data () {
    return this._data
  }

  /**
   * @param {string} locationId
   * @param {string} locationName
   * @param {number} temperature
   * @param {number} humidity
   * @param {number} lastUpdated
   * @returns {Promise<void>}
   */
  async updateData (locationId, locationName, temperature, humidity, lastUpdated) {
    if (!this._data.locationClimate[locationId]) this._data.locationClimate[locationId] = { temperature: null, humidity: null, lastUpdated: null }

    this.logger.info({ locationId, temperature, humidity }, 'Updating dashboard . . .')
    this._data.locationClimate[locationId] = { locationName, temperature, humidity, lastUpdated }
  }
}

module.exports = Dashboard
