import { Router } from "express";

import expressAsynHandler from 'express-async-handler'
import * as UC from "./user.controller.js";
import { auth } from "../../middleware/auth-middelware.js";
import { systemRoles } from "../../utils/system-roles.js";

const router=Router()

router.post('/',expressAsynHandler(UC.logInUser))
router.get('/verify',expressAsynHandler(UC.verifyEmail))
router.post('/login',expressAsynHandler(UC.sigIn))
router.get('/userInfo',auth(systemRoles.STUDENT),expressAsynHandler(UC.userInfo))






export default router