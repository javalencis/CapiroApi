import {Router} from 'express'
import { login, profile, register,findUsers } from '../controllers/user.controllers.js'
import { validateToken } from '../middlewares/validateToken.js'

const router = Router()


router.post('/register',validateToken,register)
router.post('/login',login)
router.get('/profile',validateToken,profile)
router.get('/all',validateToken,findUsers)

export default router