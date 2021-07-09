import express from 'express'
import * as controller from './controller.icons'
const router = express.Router()

const prefix = '/icons'
router.get('/newReleaseGitlab', controller.newRelease)
router.post('/getIcons', controller.getIcons)
router.post('/getString', controller.getString)

export {
  router,
  prefix
}
