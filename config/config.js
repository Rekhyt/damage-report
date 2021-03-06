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
    logName: {
      doc: 'Name of the application to be used in logging.',
      format: '*',
      default: 'damage-report-service',
      env: 'LOG_NAME'
    },
    logLevel: {
      doc: 'The log level for the application.',
      format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
      default: 'info',
      env: 'LOG_LEVEL'
    },
    logToConsole: {
      doc: 'Switch logging to the console on/off.',
      format: 'Boolean',
      default: false,
      env: 'LOG_TO_CONSOLE'
    },
    logToLoggly: {
      doc: 'Switch logging to loggly.com on/off.',
      format: 'Boolean',
      default: false,
      env: 'LOG_TO_LOGGLY'
    },
    corsAllowedOrigin: {
      doc: 'The value to be sent in the Access-Control-Allow-Origin header. Empty string to disallow any web client..',
      format: '*',
      default: '*',
      env: 'CORS_ALLOWED_ORIGIN'
    }
  },
  loggly: {
    subdomain: {
      doc: 'The loggly.com sub domain that logs should be sent to.',
      format: '*',
      default: '',
      env: 'LOGGLY_SUBDOMAIN'
    },
    token: {
      doc: 'The access token for your loggy.com account.',
      format: '*',
      default: '',
      env: 'LOGGLY_TOKEN'
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
config.load(require(`./${env}.js`))

config.validate()

module.exports = config.get()
