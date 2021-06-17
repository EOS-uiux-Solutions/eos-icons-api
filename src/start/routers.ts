import { Router } from 'express'
import { v1router } from 'routers'
const router = Router()

// Startup Route:
router.get('/', function (req, res) {
  res.send('Server running. <br><br> <br>Repo https://github.com/EOS-uiux-Solutions/eos-icons-api')
})

// Configure Routes:
router.use(v1router.prefix, v1router.router)

export default router
