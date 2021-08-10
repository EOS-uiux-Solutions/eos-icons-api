import { HTTPException } from 'helpers'
import Joi from 'joi'
import Express from 'express'

const validateSchema = (schema: Joi.Schema, property: string, abortEarly:boolean = false) => {
  return (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    if (!req[property]) {
      req[property] = {} // for the case if called with empty body, to return the errors.
    }
    const { error } = schema.validate(req[property], {
      abortEarly
    })
    if (error) {
      const { details } = error
      const errors = details.map((detail) => detail.message)
      const err = new HTTPException(400, JSON.stringify(errors))
      next(err)
    } else {
      next()
    }
  }
}

export default validateSchema
