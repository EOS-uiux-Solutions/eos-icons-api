import { CustomizedIconsPayload, iconsTheme } from 'common/types'
import configs from 'configs'
import Express from 'express'
import { Logger, respond } from 'helpers'
import { updateDBIcons, SvgFactory, ImageFactory, FontFactory } from 'utils'
import { getIcon, GetStringPayload, IconInterface } from './interfaces.icons'
import { getAppropriateBase64Field, getAppropriateSVGField, svgFieldsInDB } from './model.icons'
import * as iconsServices from './service.icons'
import { tempDirectory } from 'common/constants'
import { redisServices } from 'components/redis'

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
    let icons: IconInterface[] = []
    icons = await redisServices.getAllIconsCache()
    if (icons.length === 0) {
      icons = await iconsServices.getAllIcons()
    }
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
    }
    return respond(200, { icons }, res)
  } catch (err) {
    IconsLogger.logError('getIcons', err)
    next(err)
  }
}

const getString = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    const { theme } = req.body
    const svgField = getAppropriateSVGField(theme) as svgFieldsInDB
    const base64Field = getAppropriateBase64Field(theme) as svgFieldsInDB
    const data:GetStringPayload = req.body
    const { stringType, icons, customizations } = data
    let setOfIcons: IconInterface[] = []
    setOfIcons = await redisServices.getsetOfIconsCache(icons, `name ${svgField} ${base64Field}`)
    if (setOfIcons.length === 0) {
      setOfIcons = await iconsServices.getSetOfIcons(icons, `-_id name ${svgField} ${base64Field}`)
    }
    const customizedIcons = setOfIcons.map(icon => {
      const iconCustomizer = new SvgFactory(icon[svgField]!, customizations, !!customizations)
      const customizedSVG = iconCustomizer.finalizeIcon()
      const iconString = stringType === 'base64' ? icon[base64Field] : customizedSVG
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
    const { theme } = req.body
    const svgField = getAppropriateSVGField(theme) as svgFieldsInDB
    const data:CustomizedIconsPayload = req.body
    const { exportAs, icons, customizationConfig } = data
    let setOfIcons: IconInterface[] = []
    setOfIcons = await redisServices.getsetOfIconsCache(icons, `name ${svgField}`)
    if (setOfIcons.length === 0) {
      setOfIcons = await iconsServices.getSetOfIcons(icons, `-_id name ${svgField}`)
    }
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

const getFont = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    const { theme } = req.body
    const svgField = getAppropriateSVGField(theme) as svgFieldsInDB
    const data:getIcon = req.body
    const { icons, customizations } = data
    let setOfIcons: IconInterface[] = []
    setOfIcons = await redisServices.getsetOfIconsCache(icons, `name ${svgField}`)
    if (setOfIcons.length === 0) {
      setOfIcons = await iconsServices.getSetOfIcons(icons, `-_id name ${svgField}`)
    }
    const svgStrings = {}
    for (const icon of setOfIcons) {
      const iconCustomizer = new SvgFactory(icon[svgField]!, customizations, !!customizations)
      const customizedSVG = iconCustomizer.finalizeIcon()
      svgStrings[icon.name] = customizedSVG
    }
    const srcFolderTimestamp = Math.floor(Date.now())
    const imageFactoryData:CustomizedIconsPayload = { ...data, exportAs: 'svg' }
    const imageCreator = new ImageFactory(imageFactoryData, svgStrings, srcFolderTimestamp, false)
    await imageCreator.generateTheIconsPack()
    let outlined = false
    if (theme === iconsTheme.outlined) {
      outlined = true
    }
    // generate the font package:
    const srcFolder = `temp/dist_${srcFolderTimestamp}/svg`
    const distFolderTimestamp = Math.floor(Date.now())
    const fontMaker = new FontFactory(icons, srcFolder, distFolderTimestamp, outlined)
    await fontMaker.generateFiles()
    const dist = `dist_${distFolderTimestamp}`
    const zipFolder = `${tempDirectory}/${dist}.zip`
    res.download(zipFolder)
  } catch (err) {
    IconsLogger.logError('getFont', err)
    next(err)
  }
}

export {
  newRelease,
  getIcons,
  getString,
  getFile,
  getFont
}
