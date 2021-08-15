import App from 'app'
import * as http from 'http'

const PORT: string | number = process.env.PORT || 3131
const server: http.Server = http.createServer(App)

server.listen(PORT, () => {
  console.log(`Server started successfully on port:${PORT}`)
})

export default server
