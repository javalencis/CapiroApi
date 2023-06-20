import {Router} from 'express'
import {findAlerts,updateAlert} from '../controllers/alerts.controllers.js'
const router = Router()


router.get('/',findAlerts)
router.put('/',updateAlert)


export default router