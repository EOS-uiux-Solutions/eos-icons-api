import { promises as pfs } from 'fs'
import Express from 'express'
import { Logger } from 'helpers'
import { GetSvgCodePayload } from './interfaces.v1'
import { getSvgCode, getThemeDir, serializer, svgToPng } from 'utils/tools'
import { iconsTheme, iconsThemeV1 } from 'common/types'
import { FontFactory, SvgFactory } from 'utils'
import { analyticsServices } from '../analytics'
import { tempDirectory } from 'common/constants'
import ImageFactory from 'utils/imageFactory'

const V1Logger = new Logger('V1 Controller')

const getSVGCode = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    const { customizationConfig, iconArray }: GetSvgCodePayload = req.body
    const theme = req.query.theme as iconsThemeV1
    const customizedSVGs: string[] = []
    // loop through the icons, fetch the svg using the svg factory
    // and make the changes if customizations is requested
    for (let i = 0; i < iconArray.length; i++) {
      const svgString = await getSvgCode(theme, iconArray[i])
      const svgCustomizer = new SvgFactory(svgString, customizationConfig, !!customizationConfig)
      const customizedSvg = svgCustomizer.finalizeIcon()
      customizedSVGs.push(customizedSvg)
    }
    res.status(200).json({ responseObject: customizedSVGs })
  } catch (err) {
    V1Logger.logError('getSVGCode', err)
    next(err)
  }
}

const downloadSVG = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    const theme = req.query.theme as iconsThemeV1 | iconsTheme
    const iconName = req.params.iconName as string
    // set paths:
    const themeDir = getThemeDir(theme)
    const iconPath = `${themeDir}/${iconName}.svg`
    // add analytics data to db:
    const serializedData = serializer({ icons: [iconName] }, 'svg')
    analyticsServices.createAnalyticDocument(serializedData)
    res.download(iconPath)
  } catch (err) {
    V1Logger.logError('getSVGCode', err)
    next(err)
  }
}

const fontsApi = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    const icons = req.body.icons as string[]
    const theme = req.query.theme as iconsThemeV1 | iconsTheme
    const serializedData = serializer({ icons: icons }, 'font')
    // generate the font package:
    const fontMaker = new FontFactory(icons, serializedData.timestamp, theme || 'svg')
    await fontMaker.generateFiles()
    // add analytics data to db:
    await analyticsServices.createAnalyticDocument(serializedData)
    res.status(200).send((serializedData.timestamp).toString())
  } catch (err) {
    V1Logger.logError('fontsApi', err)
    next(err)
  }
}

const downloadPNG = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    const iconName = req.params.iconName as string
    const pngSize = +req.params.pngSize as number
    const theme = req.query.theme as iconsThemeV1 | iconsTheme
    // set paths:
    const themeDir = getThemeDir(theme)
    const iconPath = `${themeDir}/${iconName}.svg`
    const outputPath = `${tempDirectory}/${iconName}_${pngSize}.png`
    // convert svg to png:
    const pngBuffer = await svgToPng(pngSize, iconPath)
    await pfs.writeFile(outputPath, pngBuffer)
    // add analytics data to db:
    const serializedData = serializer({ icons: [iconName] }, 'png')
    analyticsServices.createAnalyticDocument(serializedData)
    res.download(outputPath)
  } catch (err) {
    V1Logger.logError('pngDownload', err)
    next(err)
  }
}

const iconCustomization = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    const { icons } = req.body
    const { customizationConfig } = req.body
    const timestamp = Math.floor(Date.now())
    const theme = req.query.theme as iconsThemeV1
    const svgStrings = {}
    for (let i = 0; i < icons.length; i++) {
      const svgString = await getSvgCode(theme, icons[i])
      const svgCustomizer = new SvgFactory(svgString, customizationConfig, !!customizationConfig)
      const customizedSvg = svgCustomizer.finalizeIcon()
      svgStrings[icons[i]] = customizedSvg
    }
    const imageCreator = new ImageFactory(req.body, svgStrings, timestamp)
    await imageCreator.generateTheIconsPack()
    const serializedData = serializer(req.body, req.body.exportAs, true)
    analyticsServices.createAnalyticDocument(serializedData)
    res.status(200).send((timestamp).toString())
  } catch (err) {
    V1Logger.logError('iconCustomization', err)
    next(err)
  }
}

const downloadImage = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    let file = ''
    const { ts } = req.query
    const dist = `dist_${ts}`
    // type and iconName will be sent if the type is not zip
    const { type } = req.query
    const { iconName } = req.query
    if (type && iconName) {
      file = `${tempDirectory}/${dist}/${type}/${iconName}.${type}`
    } else {
      file = `${tempDirectory}/${dist}.zip`
    }
    res.download(file)
  } catch (err) {
    V1Logger.logError('downloadImage', err)
    next(err)
  }
}

export {
  getSVGCode,
  downloadSVG,
  fontsApi,
  downloadPNG,
  iconCustomization,
  downloadImage
}
