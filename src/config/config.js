const convict = require('convict')

const config = convict({
  application: {
    env: {
      doc: 'Application environment.',
      format: ['development', 'production'],
      default: 'development',
      env: 'NODE_ENV'
    },
    port: {
      doc: 'HTTP port the application should listen on.',
      format: 'port',
      default: 8000,
      env: 'PORT'
    },
    logLevel: {
      doc: 'The log level for the application.',
      format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
      default: 'info',
      env: 'LOG_LEVEL'
    }
  },
  instrumental: {
    apiKey: {
      doc: 'The API key for the instrumental.com API.',
      format: '*',
      default: '',
      env: 'I_API_KEY'
    }
  }
})

const env = config.get('application.env')
config.load(`./${env}.js`)

config.validate()

module.exports = config.get()
