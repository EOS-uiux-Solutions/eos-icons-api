import Express from 'express'
process.env.NODE_CONFIG_DIR = 'configs'

class App {
    application: Express.Application
    constructor (application: Express.Application) {
      this.application = application
    }

    get appInstance () {
      return this.application
    }
}

export default App
