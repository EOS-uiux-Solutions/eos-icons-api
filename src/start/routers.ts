import { Router } from 'express'
import { v1Router } from 'components/v1'
import { iconsRouter } from 'components/icons'
const router = Router()

// Startup Route:
router.get('/', function (req, res) {
  res.send('Server running. <br><br> <br>Repo https://github.com/EOS-uiux-Solutions/eos-icons-api')
})

// Configure Routes:
router.use(v1Router.prefix, v1Router.router)
// V2 Routers:
router.use(iconsRouter.prefix, iconsRouter.router)

export default router
