import Express from 'express'
import { Logger } from 'helpers'
import { getSvgCodePayload } from './interfaces.v1'
import { getThemeDir, serializer } from 'utils/tools'
import { iconsTheme, iconsThemeV1 } from 'common/types'
import { SvgFactory } from 'utils'
import { analyticsServices } from 'services'
const IconsLogger = new Logger('Icons Controller')

const getSVGCode = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    const { customizationConfig, iconArray }: getSvgCodePayload = req.body
    const theme = req.query.theme as iconsThemeV1 | iconsTheme
    // get the directory that will be used to fetch the icons:
    const themeDir = getThemeDir(theme)
    const customizedSVGs: string[] = []
    // loop through the icons, fetch the svg using the svg factory
    // and make the changes if customizations is requested
    for (let i = 0; i < iconArray.length; i++) {
      const iconPath = `${themeDir}/${iconArray[i]}.svg`
      const svgCustomizer = new SvgFactory(iconPath, customizationConfig, !!customizationConfig)
      const customizedSvg = svgCustomizer.finalizeIcon()
      customizedSVGs.push(customizedSvg)
    }
    res.status(200).json({ responseObject: customizedSVGs })
  } catch (err) {
    IconsLogger.logError('getSVGCode', err)
    next(err)
  }
}

const downloadSVG = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    const theme = req.query.theme as iconsThemeV1 | iconsTheme
    const iconName = req.params.iconName as string
    const themeDir = getThemeDir(theme)
    const iconPath = `${themeDir}/${iconName}.svg`
    const serializedData = serializer({ icons: [iconName] }, 'svg', false)
    analyticsServices.createAnalyticDocument(serializedData)
    res.download(iconPath)
  } catch (err) {
    IconsLogger.logError('getSVGCode', err)
    next(err)
  }
}

export {
  getSVGCode,
  downloadSVG
}
