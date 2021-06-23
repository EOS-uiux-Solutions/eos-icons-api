/* eslint-disable import/first */
process.env.NODE_CONFIG_DIR = './src/configs'
import Express from 'express'
import { configure, routers, errorHandlers } from 'start'
import { mongoDBconnector } from 'databases'
import configs from 'configs'
import { executeTestCommand } from 'tests/testing-script'
const app:Express.Application = Express();

(async () => {
  // To run the Postman tests
  if (process.env.NODE_ENV === 'test') {
    executeTestCommand()
  }
  // **************** Connect to databases *******************

  // MongoDB
  if (process.env.NODE_ENV !== 'test') {
    await mongoDBconnector()
  }
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
