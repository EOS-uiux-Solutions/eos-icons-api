import configs from 'configs'
import Express from 'express'
import { Logger, respond } from 'helpers'
import { SvgFactory } from 'utils'
import updateDBIcons from 'utils/updateDBIcons'
import { getStringPayload } from './interfaces.icons'
import * as iconsServices from './service.icons'

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

const getIcons = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    const { color } = req.body
    const icons = await iconsServices.getAllIcons()
    if (color) {
      icons.map(icon => {
        const svgCustomizer = new SvgFactory(icon.svg, { colorCode: color }, true)
        icon.svg = svgCustomizer.finalizeIcon()
        if (icon.svgOutlined) {
          const svgOutlinedCustomizer = new SvgFactory(icon.svgOutlined!, { colorCode: color }, true)
          icon.svgOutlined = svgOutlinedCustomizer.finalizeIcon()
        }
        return icon
      })
      return respond(200, { icons }, res)
    }
  } catch (err) {
    IconsLogger.logError('getIcons', err)
    next(err)
  }
}

const getString = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    const data:getStringPayload = req.body
    const { stringType } = data
    console.log(stringType)
  } catch (err) {
    IconsLogger.logError('getString', err)
    next(err)
  }
}

export {
  newRelease,
  getIcons,
  getString
}
