import { promises as pfs } from 'fs'
import pify from 'pify'
// it doesn't have a @types, that reason we used require here.
import svg2img from 'svg2img'
const psvg2img = pify(svg2img)

async function svgToPng (pngSize: string, svgPath: string, outputPath: string) {
  try {
    const svgOptions = {
      width: pngSize,
      height: pngSize
    }
    const buffer = await psvg2img(svgPath, svgOptions)
    await pfs.writeFile(outputPath, buffer)
  } catch (err) {
    throw new Error(`An error occured while converting the svg to png: ${err}`)
  }
}

export default svgToPng
