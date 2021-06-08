import pify from 'pify'
import svg2img from 'svg2img'
const psvg2img = pify(svg2img)

async function svgToPng (pngSize: string, svgPath: string) {
  try {
    const svgOptions = {
      width: pngSize,
      height: pngSize
    }
    const buffer = await psvg2img(svgPath, svgOptions)
    return buffer
  } catch (err) {
    throw new Error(`An error occured while converting the svg to png: ${err}`)
  }
}

export default svgToPng
