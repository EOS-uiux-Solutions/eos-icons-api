import express from 'express'
import * as controller from './controller.icons'
const router = express.Router()

const prefix = '/icons'
router.post('/newReleaseGitlab', controller.newRelease)

export {
  router,
  prefix
}
