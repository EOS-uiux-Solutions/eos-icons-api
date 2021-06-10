import Express from 'express'
import { handleError, HttpError, Logger } from '../helpers'

const logger = new Logger('NODE')

export default (app:Express.Application) => {
  app.use((err:HttpError, req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
    logger.logError('Handled Error', err)
    handleError(err, res)
  })

  process.on('unhandledRejection', function (err:HttpError) {
    logger.logError('unhandledRejection', err)
    process.exit(1)
  })

  process.on('uncaughtException', (err:HttpError) => {
    logger.logError('uncaughtException', err)
    process.exit(1)
  })
}
