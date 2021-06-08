import Express from 'express'
import App from 'app'
import * as http from 'http'

const PORT: string | number = process.env.PORT || 3131
const app = new App(Express())

const server: http.Server = http.createServer(app.appInstance)
server.listen(PORT, () => {
  console.log(`Server started successfully on port:${PORT}`)
})
