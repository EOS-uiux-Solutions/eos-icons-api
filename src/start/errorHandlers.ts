import Express from 'express'
import { handleError, HttpError, NodeLogger } from 'helpers'

export default (app:Express.Application) => {
  app.use((err:HttpError, req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
    handleError(err, res)
  })

  process.on('unhandledRejection', (err:HttpError) => {
    NodeLogger.logError('unhandledRejection', err)
    process.exit(1)
  })

  process.on('uncaughtException', (err:HttpError) => {
    NodeLogger.logError('uncaughtException', err)
    process.exit(1)
  })
}
