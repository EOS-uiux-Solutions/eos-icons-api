import express from 'express'
import * as controller from './controller.suggestion'
import { validateSchema } from 'middlewares'
import * as validationSchemas from './validation.suggestion'
const router = express.Router()

const prefix = '/suggestion'
router.post('/add', validateSchema(validationSchemas.addSuggestion, 'body'), controller.addSuggestion)
router.get('/getAll', controller.getAllSuggestions)
router.post('/decide', validateSchema(validationSchemas.decide, 'body'), controller.decide)

export {
  router,
  prefix
}