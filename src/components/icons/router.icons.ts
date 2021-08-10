import express from 'express'
import * as controller from './controller.icons'
import { validateSchema } from 'middlewares'
import * as validationSchemas from './validation.icons'
const router = express.Router()

const prefix = '/icons'
router.post('/newReleaseGitlab', controller.newRelease)
router.post('/getIcons', validateSchema(validationSchemas.getIcons, 'body'), controller.getIcons)
router.post('/getString', validateSchema(validationSchemas.getString, 'body'), controller.getString)
router.post('/getFile', validateSchema(validationSchemas.getFile, 'body'), controller.getFile)
router.post('/getFont', validateSchema(validationSchemas.getFont, 'body'), controller.getFont)

export {
  router,
  prefix
}
