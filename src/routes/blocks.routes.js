import {Router} from 'express'
import {findBlocks,saveBlock,updateBlock} from '../controllers/blocks.controller.js'
const router = Router()


router.get('/all',findBlocks)
router.post('/',saveBlock)
router.put('/',updateBlock)


export default router




