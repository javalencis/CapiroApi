import {Router} from 'express'

import * as garlandControllers from '../controllers/garlands.controllers.js'

const router = Router()


router.get('/',garlandControllers.findGarlands)
router.post('/',garlandControllers.createGarland)
router.put('/:id',garlandControllers.updateGarland)
router.delete('/:id',garlandControllers.deleteGarland)


export default router