import Express from 'express'
import { Logger } from 'helpers'

const V1Logger = new Logger('V1 Controller')

const newRelease = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    console.log('test')
  } catch (err) {
    V1Logger.logError('newRelease', err)
    next(err)
  }
}

export {
  newRelease
}
