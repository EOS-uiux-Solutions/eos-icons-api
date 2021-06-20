import express from 'express'
import * as controller from './controller.v1'
const router = express.Router()

const prefix = ''

router.post('/icon/svg/svgcode', controller.getSVGCode)
router.get('/icon/svg/download/:iconName', controller.downloadSVG)
router.get('/icon/png/download/:iconName/:pngSize', controller.downloadPNG)
router.post('/icon-customization', controller.iconCustomization)
router.get('/download', controller.downloadImage)
router.get('/icon-download', controller.downloadImage)

export {
  router,
  prefix
}
