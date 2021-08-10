import express from 'express'
import { isAdmin } from 'middlewares'
import * as controller from './controller.suggestion'
const router = express.Router()

const prefix = '/suggestion'
router.post('/add', controller.addSuggestion)
router.get('/getAll', isAdmin(), controller.getAllSuggestions)
router.post('/decide', isAdmin(), controller.decide)

export {
  router,
  prefix
}
