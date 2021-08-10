import configs from 'configs'
import Express from 'express'
import { HTTPException } from 'helpers'

const isAdmin = () => {
  return (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try {
      const { secretkey } = req.headers
      if (secretkey !== configs.ADMIN_SECRET_KEY) {
        throw new HTTPException(401, "You're not authorized")
      }
      return next()
    } catch (err) {
      next(err)
    }
  }
}

export default isAdmin
