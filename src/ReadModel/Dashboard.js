const { ReadModel } = require('ddd-js')

class Dashboard extends ReadModel {
  setup () {
    this._data = {}

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
    if (!this._data[locationName]) this._data[locationName] = { temperature: null, humidity: null }

    this._data[locationName].temperature = temperature
    this._data[locationName].humidity = humidity
  }
}

module.exports = Dashboard