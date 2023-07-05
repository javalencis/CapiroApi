import {Router} from 'express'
import { login, profile, register } from '../controllers/user.controllers.js'
import { validateToken } from '../middlewares/validateToken.js'

const router = Router()


router.post('/register',validateToken,register)
router.post('/login',login)
router.get('/profile',validateToken,profile)


export default router