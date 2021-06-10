/* eslint-disable import/first */
process.env.NODE_CONFIG_DIR = './src/configs'
import Express from 'express'
import { configure, routers } from './start'
import configs from './configs'

const app:Express.Application = Express();

(async () => {
  // Configure the appliction (Parser, and additonal headers):
  configure(app)
  // init the routers:
  app.use(configs.API_PREFIX, routers)
})()

export default app
