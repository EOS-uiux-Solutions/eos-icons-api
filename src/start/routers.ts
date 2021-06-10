import { Router } from 'express'
const router = Router()

// Startup Route:
router.get('/', function (req, res) {
  res.send('Server running. <br><br> <br>Repo https://github.com/EOS-uiux-Solutions/eos-icons-api')
})

// Configure Routes:

export default router
