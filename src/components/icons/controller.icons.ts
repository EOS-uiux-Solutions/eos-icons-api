import Express from 'express'
import { Logger } from 'helpers'
import updateDBIcons from 'utils/updateDBIcons'

const IconsLogger = new Logger('Icons Controller')

const newRelease = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    IconsLogger.logInfo('newRelease', { message: 'A request is send to update the icons', context: req.body })
    res.status(200).json({ message: 'update process will start' })
    updateDBIcons(true)
  } catch (err) {
    IconsLogger.logError('newRelease', err)
    next(err)
  }
}

export {
  newRelease
}
