import {Router} from 'express'

import * as garlandControllers from '../controllers/garlands.controllers.js'

import { validateToken } from '../middlewares/validateToken.js'

const router = Router()

router.get('/',garlandControllers.findGarlands)
router.use(validateToken)
router.post('/',garlandControllers.createGarland)
router.put('/:id',garlandControllers.updateGarland)
router.delete('/:id',garlandControllers.deleteGarland)


export default router