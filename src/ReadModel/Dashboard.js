const { ReadModel } = require('ddd-js')

class Dashboard extends ReadModel {
  setup () {
    this._data = {
      locationClimate: {}
    }

    this.registerEvent('ClimateData.dataUpdated', event => this.updateData(
      event.payload.locationName,
      event.payload.temperature,
      event.payload.humidity
    ))
  }

  get data () {
    return this._data
  }

  /**
   * @param {string} locationName
   * @param {number} temperature
   * @param {number} humidity
   * @returns {Promise<void>}
   */
  async updateData (locationName, temperature, humidity) {
    if (!this._data.locationClimate[locationName]) this._data.locationClimate[locationName] = { temperature: null, humidity: null }

    this._data.locationClimate[locationName].temperature = temperature
    this._data.locationClimate[locationName].humidity = humidity
  }
}

module.exports = Dashboard
