import express from 'express'
import { validateSchema, isAdmin } from 'middlewares'
import * as controller from './controller.suggestion'
import * as validationSchemas from './validation.suggestion'
const router = express.Router()

const prefix = '/suggestion'
router.post('/add', validateSchema(validationSchemas.addSuggestion, 'body'), controller.addSuggestion)
router.get('/getAll', isAdmin(), controller.getAllSuggestions)
router.post('/decide', isAdmin(), validateSchema(validationSchemas.decide, 'body'), controller.decide)

export {
  router,
  prefix
}
