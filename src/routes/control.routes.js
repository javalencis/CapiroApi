import { Router } from "express";
import { saveControl } from "../controllers/control.controllers.js";
import { validateToken } from "../middlewares/validateToken.js";


const router = Router();

router.use(validateToken);
router.post('/',saveControl)


export default router;