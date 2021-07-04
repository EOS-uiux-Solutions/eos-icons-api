import winston from 'winston'
import configs from 'configs'
import { HttpError } from 'helpers'

const dateFormat = () => {
  return new Date(Date.now()).toLocaleString()
}

interface InfoLog {
  message: string
  context?: Object
}

class Logger {
  private logger: winston.Logger;
  private caller: string;
  constructor (caller: string) {
    this.caller = caller

    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.printf(log => {
        let message = `[${this.caller}: ${log.source}] | ${dateFormat()} | ${log.level.toUpperCase()} | ${log.message} | `
        message = log.logDetails ? `${message} ${JSON.stringify(log.logDetails)} | ` : message
        return message
      }),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `${configs.LOG_FILE_PATH}/error.log`, level: 'error' }),
        new winston.transports.File({ filename: `${configs.LOG_FILE_PATH}/info.log`, level: 'info' })
      ]
    })

    this.logger = logger
  }

  logError (source: string, err: Error | HttpError) {
    this.logger.error(err.message, { source, logDetails: err })
  }

  logInfo (source: string, info: InfoLog) {
    this.logger.info(info.message, { source, logDetails: info })
  }
}

// Default logger, will be used to throw errors due to non-APIs issues:
const NodeLogger = new Logger('NODE')

export {
  Logger,
  NodeLogger
}
