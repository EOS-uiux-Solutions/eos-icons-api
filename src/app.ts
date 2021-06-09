import Express from 'express'
process.env.NODE_CONFIG_DIR = 'configs'

const app:Express.Application = Express();

(async () => {
  // other configurations will be set from here:

})()

export default app
