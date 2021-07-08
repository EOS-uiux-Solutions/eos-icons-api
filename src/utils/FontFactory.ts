import util from 'util'
import cmd from 'node-cmd'
import { zipFolder, addConfigFile } from './tools'
import { tempDirectory } from '../common/constants'
import { iconsTheme, iconsThemeV1 } from 'common/types'
// promise-style version of cmd.get
const pcmdGet = util.promisify(cmd.get)

class FontFactory {
    private icons: string[]
    private timestamp: number
    private theme: iconsTheme | iconsThemeV1

    constructor (icons: string[], timestamp: number, theme: iconsTheme | iconsThemeV1) {
      this.icons = icons
      this.timestamp = timestamp
      this.theme = theme
    }

    generateGruntCommand () {
      try {
        const outlined = this.theme === 'outlined' ? 'svg-outlined' : 'svg'
        let command = ''
        for (let i = 0; i < this.icons.length; i++) {
          command += `--extended_src=${this.theme}/${this.icons[i]}.svg `
        }
        const preparedCommand = `grunt -b ./src --dist=${this.timestamp} ${command} --outlined=${outlined === 'svg-outlined'}`
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
