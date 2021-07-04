import configs from 'configs'
import Express from 'express'
import { Logger } from 'helpers'
import updateDBIcons from 'utils/updateDBIcons'

const IconsLogger = new Logger('Icons Controller')

const newRelease = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    if (req.headers['x-gitlab-token'] === configs.GITLAP_HOOK_TOKEN) {
      res.status(200).json({ message: 'Thanks for notifying me' })
      IconsLogger.logInfo('newRelease', { message: 'an icons\' update is released', context: req.body })
      updateDBIcons(true)
    } else {
      res.status(403).json({ message: 'Thank you for acting as Gitlab' })
    }
  } catch (err) {
    IconsLogger.logError('newRelease', err)
    next(err)
  }
}

export {
  newRelease
}
