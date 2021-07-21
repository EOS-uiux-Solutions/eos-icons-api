import express from 'express'
import * as controller from './controller.icons'
const router = express.Router()

const prefix = '/icons'
router.post('/newReleaseGitlab', controller.newRelease)
router.post('/getIcons', controller.getIcons)
router.post('/getString', controller.getString)
router.post('/getFile', controller.getFile)
router.post('/getFont', controller.getFont)

export {
  router,
  prefix
}
