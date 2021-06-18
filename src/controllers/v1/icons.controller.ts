import Express from 'express'
import { Logger } from 'helpers'
import { getSvgCodePayload } from './interfaces'
import { getThemeDir } from 'utils/tools'
import { iconsTheme, iconsThemeV1 } from 'common/types'
import { SvgFactory } from 'utils'
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

export {
  getSVGCode
}
