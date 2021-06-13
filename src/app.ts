/* eslint-disable import/first */
process.env.NODE_CONFIG_DIR = './src/configs'
import Express from 'express'
import { configure, routers, errorHandlers } from 'start'
import { mongoDBconnector } from 'databases'
import configs from 'configs'

const app:Express.Application = Express();

(async () => {
  // **************** Connect to databases *******************

  // MongoDB
  await mongoDBconnector()
  // Redis:

  // ************** Other App configurations *****************

  // Configure the appliction (Parser, and additonal headers):
  configure(app)
  // init the routers:
  app.use(configs.API_PREFIX, routers)
  // init the main error handlers:
  errorHandlers(app)
})()

export default app
