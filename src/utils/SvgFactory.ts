import { CustomizedConfig, FlipObject } from 'common/types'

class SvgFactory {
    private svgString: string = '';
    private colorCode: string | undefined;
    private rotateAngle: number | undefined;
    private flip: FlipObject | undefined;
    private customized: boolean;

    constructor (svgString: string, customizationConfig: CustomizedConfig, customized: boolean = false) {
      this.svgString = svgString
      this.colorCode = customizationConfig?.colorCode
      this.rotateAngle = customizationConfig?.rotateAngle
      this.flip = customizationConfig?.flip
      this.customized = customized
    }

    private modifySvgCode () {
      const gTagOpen = `<g ${this.changeColor()} transform="${this.flipIcon()} ${this.rotateIcon()}">`
      const index1 = this.svgString.indexOf('>') + 1
      const index2 = this.svgString.lastIndexOf('<')
      this.svgString = `${this.svgString.slice(0, index1)}${gTagOpen}${this.svgString.slice(index1, index2)}</g></svg>`
    }

    finalizeIcon () {
      if (this.customized) {
        this.modifySvgCode()
      }
      return this.svgString
    }

    private changeColor () {
      if (this.colorCode) {
        return `fill="${this.colorCode}"`
      }
      return ''
    }

    private rotateIcon () {
      if (this.rotateAngle) {
        return `rotate(${this.rotateAngle}, 12, 12)` // considering viewport 24x24 for all icons
      }
      return ''
    }

    private flipIcon () {
      if (this.flip) {
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
      return ''
    }
}

export default SvgFactory
