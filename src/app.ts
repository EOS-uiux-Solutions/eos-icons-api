/* eslint-disable import/first */
import Express from 'express'
import { configure, routers, errorHandlers } from 'start'
import { mongoDBconnector } from 'databases'
import configs from 'configs'
import { executeTestCommand } from 'tests/testing-script'
import { updateDBIcons } from 'utils'
const app:Express.Application = Express();

(async () => {
  // To run the Postman tests
  if (process.env.NODE_ENV === 'test') {
    executeTestCommand()
  }
  // **************** Connect to databases *******************

  if (process.env.NODE_ENV !== 'test') {
    await mongoDBconnector()
  }
  // Redis:

  // ************** Other App configurations *****************

  // Configure the appliction (Parser, and additonal headers):
  configure(app)
  // init the routers:
  app.use(configs.API_PREFIX, routers)
  // Run the updating processes:
  if (process.env.NODE_ENV !== 'test') {
    await updateDBIcons()
  }
  // init the main error handlers:
  errorHandlers(app)
})()

export default app
