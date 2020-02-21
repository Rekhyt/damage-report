const config = require('./config/config')
const bunyan = require('bunyan')
const { Runner } = require('ddd-js')

const ClimateData = require('./Aggregate/Climate/ClimateData')
const InstrumentalReadModel = require('./ReadModel/Instrumental')
const DashboardReadModel = require('./ReadModel/Dashboard')

const logStreams = []
if (config.application.logToConsole) logStreams.push({ stream: process.stdout })
if (config.application.logToLoggly && config.loggly.subdomain && config.loggly.token) {
  logStreams.push({
    type: 'raw',
    stream: new (require('bunyan-loggly'))({
      subdomain: config.loggly.subdomain,
      token: config.loggly.token
    })
  })
}
const logger = bunyan.createLogger({ name: config.application.logName, level: config.application.logLevel, streams: logStreams })

const logConfig = {
  application: { ...config.application },
  loggly: { ...config.loggly, token: 'XXX' },
  instrumental: { ...config.instrumental, apiKey: 'XXX' }
}

logger.info(logConfig, 'Using configuration . . .')

const runner = Runner
  .createWithExpress(logger, '/dev/null')
  .attachRootEntity(ClimateData)
  .attachReadModel('/dashboard', DashboardReadModel, 'data')

if (config.instrumental.apiKey) runner.attachReadModel('/instrumental', InstrumentalReadModel, 'readme')

runner.startServer(config.application.port)
