import express from 'express'
import * as controller from './controller.v1'
const router = express.Router()

const prefix = ''

router.post('/icon/svg/svgcode', controller.getSVGCode)
router.get('/icon/svg/download/:iconName', controller.downloadSVG)

export {
  router,
  prefix
}
