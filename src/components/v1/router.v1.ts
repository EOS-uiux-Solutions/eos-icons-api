import express from 'express'
import * as controller from './controller.v1'
const router = express.Router()

const prefix = ''

router.post('/icon/svg/svgcode', controller.getSVGCode)
router.get('/icon/svg/download/:iconName', controller.downloadSVG)
<<<<<<< HEAD
router.post('/iconsapi', controller.fontsApi)
=======
router.get('/icon/png/download/:iconName/:pngSize', controller.downloadPNG)
>>>>>>> 3a08e5185a9b2423be91c1640486a586b19b0985

export {
  router,
  prefix
}
