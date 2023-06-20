import {Router} from 'express'
import {findRegisters} from '../controllers/register.controllers.js'
const router = Router()


router.get('/',findRegisters)

export default router