const config = require('./config/config')
const bunyan = require('bunyan')
const { Runner } = require('ddd-js')

const ClimateData = require('./Aggregate/Climate/ClimateData')
const InstrumentalReadModel = require('./ReadModel/Instrumental')
const DashboardReadModel = require('./ReadModel/Dashboard')

const logger = bunyan.createLogger({ name: 'damage-report', level: config.application.logLevel })

logger.info(config, 'Using configuration . . .')

const runner = Runner
  .createWithExpress(logger, '/dev/null')
  .attachRootEntity(ClimateData)
  .attachReadModel('/instrumental', InstrumentalReadModel, 'readme')
  .attachReadModel('/dashboard', DashboardReadModel, 'data')
  .startServer(config.application.port)