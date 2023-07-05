import {Router} from 'express'
import {findAlerts,updateAlert,createAlert} from '../controllers/alerts.controllers.js'
import { validateToken } from '../middlewares/validateToken.js'
const router = Router()

router.use(validateToken)

router.post('/',createAlert)
router.get('/',findAlerts)
router.put('/',updateAlert)


export default router