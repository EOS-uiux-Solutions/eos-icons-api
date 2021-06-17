import express from 'express'
import * as controller from 'controllers/v1/icons.controller'
const router = express.Router()

const prefix = ''

router.post('/icon/svg/svgcode', controller.getSVGCode)

export {
  router,
  prefix
}
