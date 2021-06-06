import Express from 'express'

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
