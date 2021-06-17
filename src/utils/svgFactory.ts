import fs, { promises as pfs } from 'fs'
import { customizedConfig, flipObject } from 'common/types'

class SvgFactory {
    private svgCode: string = '';
    private pathToSvg: string;
    private outputPathToSvg: string;
    private colorCode: string;
    private rotateAngle: number;
    private flip: flipObject;

    constructor (pathToSvg: string, outputPathToSvg: string, customizationConfig: customizedConfig) {
      this.pathToSvg = pathToSvg
      this.outputPathToSvg = outputPathToSvg
      this.colorCode = customizationConfig.colorCode!
      this.rotateAngle = customizationConfig.rotateAngle!
      this.flip = customizationConfig.flip!
    }

    get getSvgCode () {
      return this.svgCode
    }

    readSvgCode () {
      if (fs.existsSync(this.pathToSvg)) {
        this.svgCode = fs.readFileSync(this.pathToSvg, 'utf8')
      } else {
        this.svgCode = fs.readFileSync(this.pathToSvg.replace('svg-outlined', 'svg'), 'utf8')
      }
    }

    modifySvgCode () {
      const gTagOpen = `<g ${this.changeColor()} transform="${this.rotateIcon()} ${this.flipIcon()}">`
      const index1 = this.svgCode.indexOf('>') + 1
      const index2 = this.svgCode.lastIndexOf('<')
      this.svgCode = `${this.svgCode.slice(0, index1)}${gTagOpen}${this.svgCode.slice(index1, index2)}</g></svg>`
    }

    async finalizeIcon () {
      this.readSvgCode()
      this.modifySvgCode()
      await pfs.writeFile(this.outputPathToSvg, this.svgCode)
    }

    private changeColor () {
      return `fill="${this.colorCode}"`
    }

    private rotateIcon () {
      return `rotate(${this.rotateAngle}, 12, 12)` // considering viewport 24x24 for all icons
    }

    private flipIcon () {
      const horizontalFlip = this.flip.horizontal
      const verticalFlip = this.flip.vertical
      let translateX = 0
      let translateY = 0
      let scaleX = 1
      let scaleY = 1
      if (horizontalFlip) {
        scaleX = -1
        translateX = 24
      }
      if (verticalFlip) {
        scaleY = -1
        translateY = 24
      }
      return `translate(${translateX}, ${translateY}) scale(${scaleX}, ${scaleY})`
    }
}

export default SvgFactory