import { zipFolder, addConfigFile } from './tools'

import { tempDirectory } from '../common/constants'

class FontFactory {
    private icons: Array<string>
    private timestamp: number
    private theme: string

    constructor (icons: Array<string>, timestamp: number, theme: string) {
      this.icons = icons
      this.timestamp = timestamp
      this.theme = theme
    }

    gruntCdIcons () {
      try {
        let command = ''
        for (let i = 0; i < this.icons.length; i++) {
          command += `--extended_src=${this.theme}/${this.icons[i]}.svg `
        }
        return `grunt -b ./src --dist=${this.timestamp} ${command} --outlined=${this.theme === 'svg-outlined'}`
      } catch (err) {
        throw new Error(`Some error occurred while generating Icons set command: ${err}`)
      }
    }

    async generateFiles () {
      const folderPath = `${tempDirectory}dist_${this.timestamp}`
      const configFilePath = `${folderPath}/icons_config.json`
      const zipOutputPath = `${folderPath}.zip`
      await addConfigFile(configFilePath, JSON.stringify({ icons: this.icons, exportAs: 'font' }))
      await zipFolder(folderPath, zipOutputPath)
    }
}

export default FontFactory
