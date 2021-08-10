/* eslint-disable import/first */
import Express from 'express'
import { configure, routers, errorHandlers } from 'start'
// eslint-disable-next-line no-unused-vars
import { mongoDBconnector, updateAlgoliaIcons } from 'databases'
import configs from 'configs'
import { executeTestCommand } from 'tests/testing-script'
import { updateDBIcons, updateCachedIcons } from 'utils'
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
    updateCachedIcons()
    // ### uncomment The line below if you want to update the algolia icons manually.
    // await updateAlgoliaIcons()
  }
  // init the main error handlers:
  errorHandlers(app)
})()

export default app
