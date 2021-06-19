import fs, { promises as pfs } from 'fs'
import SvgFactory from './SvgFactory'
import { svgToPng, addConfigFile, zipFolder, getThemeDir } from './tools'
import { tempDirectory } from 'common/constants'
import { customizedIconsPayload, iconsTheme, iconsThemeV1 } from 'common/types'

class ImageFactory {
    private payload: any;
    private timestamp: number;
    private iconsOutputPath: string;
    private distDir: string;
    // Will be used to locate the icons folder based on the theme
    private themeDir: string;

    constructor (payload: customizedIconsPayload, timestamp: number, theme: iconsThemeV1 | iconsTheme) {
      this.payload = payload
      this.timestamp = timestamp
      this.distDir = `${tempDirectory}/dist_${this.timestamp}`
      this.iconsOutputPath = `${this.distDir}/${this.payload.exportAs}`
      this.themeDir = getThemeDir(theme)
    }

    private async createDirectory () {
      try {
        const isTempDirExists = fs.existsSync(tempDirectory)
        if (!isTempDirExists) {
          await pfs.mkdir(tempDirectory)
        }
        await pfs.mkdir(this.distDir)
        await pfs.mkdir(this.iconsOutputPath)
      } catch (err) {
        throw new Error(`An error occured while creating the '${this.distDir}' directory: ${err}`)
      }
    }

    private modifySvg (iconPath: string) {
      try {
        const config = this.payload.customizationConfig
        const svgCustomizer = new SvgFactory(iconPath, config, !!config)
        const customizedSvg = svgCustomizer.finalizeIcon()
        return customizedSvg
      } catch (err) {
        throw new Error(`Some error occurred while modifying - ${iconPath} - :  ${err}`)
      }
    }

    private async createIconFile () {
      try {
        for (let i = 0; i < this.payload.icons.length; i++) {
          const iconName = this.payload.icons[i]
          const iconPath = `${this.themeDir}/${iconName}.svg`
          const outputPath = `${this.iconsOutputPath}/${iconName}.${this.payload.exportAs}`
          // make the modification on the svg:
          const modifiedSvg = this.modifySvg(iconPath)
          if (this.payload.exportAs === 'png') {
            // if the requested type is png make the conversion:
            const pngBuffer = await svgToPng(this.payload.exportSize, modifiedSvg)
            await pfs.writeFile(outputPath, pngBuffer)
          } else {
            // else, write the svg file
            await pfs.writeFile(outputPath, modifiedSvg)
          }
        }
      } catch (err) {
        throw new Error(`Some error occurred while creating PNG file: ${err}`)
      }
    }

    async generateTheIconsPack () {
      const configFilePath = `${this.distDir}/customizationConfig.json`
      const zipOutputPath = `${this.distDir}/dist_${this.timestamp}.zip`
      await this.createDirectory()
      await this.createIconFile()
      await addConfigFile(configFilePath, JSON.stringify(this.payload))
      await zipFolder(this.distDir, zipOutputPath)
    }
}

export default ImageFactory
