import util from 'util'
import cmd from 'node-cmd'
import { zipFolder, addConfigFile } from './tools'
import { tempDirectory } from '../common/constants'
// promise-style version of cmd.get
const pcmdGet = util.promisify(cmd.get)

class FontFactory {
    private icons: Array<string>
    private timestamp: number
    private theme: string

    constructor (icons: Array<string>, timestamp: number, theme: string) {
      this.icons = icons
      this.timestamp = timestamp
      this.theme = theme
    }

    generateGruntCommand () {
      try {
        let command = ''
        for (let i = 0; i < this.icons.length; i++) {
          command += `--extended_src=${this.theme}/${this.icons[i]}.svg `
        }
        const preparedCommand = `grunt -b ./src --dist=${this.timestamp} ${command} --outlined=${this.theme === 'svg-outlined'}`
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
