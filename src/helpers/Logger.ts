import winston from 'winston'
import configs from '../configs'
import { HttpError } from '../helpers/'

const dateFormat = () => {
  return new Date(Date.now()).toLocaleString()
}

class Logger {
  private logger: winston.Logger;
  private caller: string;
  constructor (caller: string) {
    this.caller = caller

    const logger = winston.createLogger({
      level: 'error',
      format: winston.format.printf(error => {
        let message = `[${this.caller}: ${error.source}] | ${dateFormat()} |  ${error.level.toUpperCase()} | ${error.message} | `
        message = error.thrownError ? `${message} ${JSON.stringify(error.thrownError)} | ` : message
        return message
      }),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `${configs.LOG_FILE_PATH}/error.log` })
      ]
    })

    this.logger = logger
  }

  logError (source: string, err: Error | HttpError) {
    this.logger.error(err.message, { source, thrownError: err })
  }
}

export default Logger
