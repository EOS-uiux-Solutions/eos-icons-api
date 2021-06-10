/**
 *
 * Any needed configurations will be set here:
 *
 */

import Express from 'express'

export default (app: Express.Application) => {
  /**
        * For Express 4.16.0 and higher: body parser has been re-added to provide request body parsing support out-of-the-box.
        * If you're using a version less than 4.16.0 use body-parser.
        */
  app.use(Express.json())

  // Access-control headers:
  app.use((req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
}
