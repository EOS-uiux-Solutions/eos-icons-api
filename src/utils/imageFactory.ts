import { promises as pfs } from 'fs'
import SvgFactory from './svgFactory'
import svgToPng from './tools/svgToPng'
import addConfigFile from './tools/addConfigFile'
import zipFolder from './tools/zipFolder'
import { tempDirectory, svgDirectory } from 'common/constants'

class ImageCustomizer {
    payload: any;
    timestamp: number;
    iconsOutputPath: string;

    constructor (payload: any, timestamp: number) {
      this.payload = payload
      this.timestamp = timestamp
      this.iconsOutputPath = `${tempDirectory}dist_${this.timestamp}/${this.payload.exportAs}/`
    }

    async createDirectory () {
      try {
        const isTempDirExists = await pfs.stat(tempDirectory)
        if (!isTempDirExists) {
          await pfs.mkdir(tempDirectory)
        }
        await pfs.mkdir(`${tempDirectory}dist_${this.timestamp}/`)
        await pfs.mkdir(this.iconsOutputPath)
      } catch (err) {
        throw new Error(`An error occured while creating the '${tempDirectory}dist_${this.timestamp}' directory: ${err}`)
      }
    }

    async createSvg () {
      try {
        for (let i = 0; i < this.payload.icons.length; i++) {
          const iconName = this.payload.icons[i]
          const srcPath = `${svgDirectory + iconName}.svg`
          const outputPath = `${this.iconsOutputPath + iconName}.svg`
          const config = this.payload.customizationConfig

          const customIconObject = new SvgFactory(srcPath, outputPath, config)
          await customIconObject.finalizeIcon()
        }
      } catch (err) {
        throw new Error(`⛔️ Some error occurred while generating zip file: ${err}`)
      }
    }

    async createPng () {
      try {
        for (let i = 0; i < this.payload.icons.length; i++) {
          const iconName = this.payload.icons[i]
          const iconPath = `${this.iconsOutputPath + iconName}.svg`
          const outputPath = `${this.iconsOutputPath + iconName}.png`
          const pngBuffer = await svgToPng(this.payload.exportSize, iconPath)
          await pfs.writeFile(outputPath, pngBuffer)
          await pfs.unlink(iconPath)
        }
      } catch (err) {
        throw new Error(`Some error occurred while creating PNG file: ${err}`)
      }
    }

    async finalize () {
      const folderPath = `${tempDirectory}dist_${this.timestamp}`
      const configFilePath = `${folderPath}/customizationConfig.json`
      const zipOutputPath = `${folderPath}.zip`

      await addConfigFile(configFilePath, JSON.stringify(this.payload))
      await zipFolder(folderPath, zipOutputPath)
    }

    async generatePack () {
      await this.createDirectory()
      await this.createSvg()
      if (this.payload.exportAs === 'png') {
        await this.createPng()
      }
      await this.finalize()
    }
}

export default ImageCustomizer
