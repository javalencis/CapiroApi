import {Router} from 'express'
import { login, profile, register } from '../controllers/user.controllers'

const router = Router()


router.post('/register',register)
router.post('/login',login)
router.get('/profile',profile)


export default router