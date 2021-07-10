import fs, { promises as pfs } from 'fs'
import { svgToPng, addConfigFile, zipFolder } from './tools'
import { tempDirectory } from 'common/constants'
import { CustomizedIconsPayload } from 'common/types'

class ImageFactory {
  private payload: CustomizedIconsPayload
  private svgStrings: {[key: string]: string}
    private timestamp: number;
    private iconsOutputPath: string;
    private distDir: string;
    private createZip: boolean

    constructor (payload: CustomizedIconsPayload, svgStrings: {[key: string]: string}, timestamp: number, createZip: boolean = true) {
      this.payload = payload
      this.createZip = createZip
      this.svgStrings = svgStrings
      this.timestamp = timestamp
      this.distDir = `${tempDirectory}/dist_${this.timestamp}`
      this.iconsOutputPath = `${this.distDir}/${payload.exportAs}`
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

    private async createIconFile () {
      try {
        for (const [iconName, svgString] of Object.entries(this.svgStrings)) {
          const outputPath = `${this.iconsOutputPath}/${iconName}.${this.payload.exportAs}`
          if (this.payload.exportAs === 'png') {
            // if the requested type is png make the conversion:
            const pngBuffer = await svgToPng(this.payload.exportSize as number, svgString)
            await pfs.writeFile(outputPath, pngBuffer)
          } else {
            // else, write the svg file
            await pfs.writeFile(outputPath, svgString)
          }
        }
      } catch (err) {
        throw new Error(`Some error occurred while creating PNG file: ${err}`)
      }
    }

    async generateTheIconsPack () {
      const configFilePath = `${this.distDir}/customizationConfig.json`
      const zipOutputPath = `${this.distDir}.zip`
      await this.createDirectory()
      await this.createIconFile()
      await addConfigFile(configFilePath, JSON.stringify(this.payload))
      if (this.payload.icons.length > 1 && this.createZip) {
        await zipFolder(this.distDir, zipOutputPath)
      }
    }
}

export default ImageFactory
