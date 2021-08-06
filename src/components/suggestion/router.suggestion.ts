import express from 'express'
import * as controller from './controller.suggestion'
const router = express.Router()

const prefix = '/suggestion'
router.post('/add', controller.addSuggestion)

export {
  router,
  prefix
}
