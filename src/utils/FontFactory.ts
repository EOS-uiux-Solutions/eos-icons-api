import util from 'util'
import cmd from 'node-cmd'
import { zipFolder, addConfigFile } from './tools'
import { tempDirectory } from '../common/constants'
// promise-style version of cmd.get
const pcmdGet = util.promisify(cmd.get)

class FontFactory {
    private icons: string[]
    private srcFolder: string
    private timestamp: number
    private isOutlined: boolean

    constructor (icons: string[], srcFolder:string, timestamp: number, outlined: boolean) {
      this.icons = icons
      this.srcFolder = srcFolder
      this.timestamp = timestamp
      this.isOutlined = outlined
    }

    generateGruntCommand () {
      try {
        let command = ''
        for (let i = 0; i < this.icons.length; i++) {
          command += `--extended_src=${this.srcFolder}/${this.icons[i]}.svg `
        }
        const preparedCommand = `grunt -b ./src --dist=${this.timestamp} ${command} --outlined=${this.isOutlined}`
        return preparedCommand
      } catch (err) {
        throw new Error(`Some error occurred while generating Icons set command: ${err}`)
      }
    }

    async generateFiles () {
      try {
        const folderPath = `${tempDirectory}/dist_${this.timestamp}`
        const configFilePath = `${folderPath}/icons_config.json`
        const zipOutputPath = `${folderPath}.zip`
        const gruntCommand = this.generateGruntCommand()

        await pcmdGet(gruntCommand)
        await addConfigFile(configFilePath, JSON.stringify({ icons: this.icons, exportAs: 'font' }))
        await zipFolder(folderPath, zipOutputPath)
      } catch (err) {
        throw new Error(`Some error occurred while generating the files: ${err}`)
      }
    }
}

export default FontFactory
