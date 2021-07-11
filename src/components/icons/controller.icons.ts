import { CustomizedIconsPayload, iconsTheme } from 'common/types'
import configs from 'configs'
import Express from 'express'
import { Logger, respond } from 'helpers'
import { getBase64 } from 'utils/tools'
import { updateDBIcons, SvgFactory, ImageFactory } from 'utils'
import { GetStringPayload } from './interfaces.icons'
import { getAppropriateSVGField, svgFieldsInDB } from './model.icons'
import * as iconsServices from './service.icons'
import { tempDirectory } from 'common/constants'

const IconsLogger = new Logger('Icons Controller')

const newRelease = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    if (req.headers['x-gitlab-token'] === configs.GITLAB_HOOK_TOKEN) {
      res.status(200).json({ message: 'Thanks for notifying me' })
      IconsLogger.logInfo('newRelease', { message: 'an icons\' update is released' })
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
    const theme = req.query.theme as iconsTheme
    const svgField = getAppropriateSVGField(theme) as svgFieldsInDB
    const data:GetStringPayload = req.body
    const { stringType, icons, customizations } = data
    const setOfIcons = await iconsServices.getSetOfIcons(icons, `-_id name ${svgField}`)
    const customizedIcons = setOfIcons.map(icon => {
      const iconCustomizer = new SvgFactory(icon[svgField]!, customizations, !!customizations)
      const customizedSVG = iconCustomizer.finalizeIcon()
      const iconString = stringType === 'base64' ? getBase64(customizedSVG) : customizedSVG
      return {
        name: icon.name,
        iconString
      }
    })
    respond(200, { stringType, icons: customizedIcons }, res)
  } catch (err) {
    IconsLogger.logError('getString', err)
    next(err)
  }
}

const getFile = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    const theme = req.query.theme as iconsTheme
    const svgField = getAppropriateSVGField(theme) as svgFieldsInDB
    const data:CustomizedIconsPayload = req.body
    const { exportAs, icons, customizationConfig } = data
    const setOfIcons = await iconsServices.getSetOfIcons(icons, `-_id name ${svgField}`)
    const svgStrings = {}
    for (const icon of setOfIcons) {
      const iconCustomizer = new SvgFactory(icon[svgField]!, customizationConfig!, !!customizationConfig)
      const customizedSVG = iconCustomizer.finalizeIcon()
      svgStrings[icon.name] = customizedSVG
    }
    const timestamp = Math.floor(Date.now())
    const dist = `dist_${timestamp}`
    const imageCreator = new ImageFactory(data, svgStrings, timestamp)
    await imageCreator.generateTheIconsPack()
    if (icons.length === 1) {
      const file = `${tempDirectory}/${dist}/${exportAs}/${icons[0]}.${exportAs}`
      res.download(file)
    } else {
      const zipFolder = `${tempDirectory}/${dist}.zip`
      res.download(zipFolder)
    }
  } catch (err) {
    IconsLogger.logError('getFile', err)
    next(err)
  }
}

export {
  newRelease,
  getIcons,
  getString,
  getFile
}
