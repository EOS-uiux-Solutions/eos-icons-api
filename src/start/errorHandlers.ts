import Express from 'express'
import { handleError, HttpError } from '../helpers'

export default (app:Express.Application) => {
  app.use((err:HttpError, req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
    handleError(err, res)
  })

  process.on('unhandledRejection', function () {
    // TODO:: use a logger here.
    process.exit(1)
  })

  process.on('uncaughtException', () => {
    // TODO:: use a logger here.
    process.exit(1)
  })
}
