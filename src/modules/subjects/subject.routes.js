import { Router } from "express";
import { auth } from "../../middleware/auth-middelware.js";
import * as SC from "./subject.controller.js";
import expressAsyncHandler from "express-async-handler";
import { subjectRols } from "./subjects-roles.js";
import { multerMiddleHost } from "../../middleware/multer-middleware.js";
import { allowedExtensions } from "../../utils/allowed-extntion.js";

const router=Router()

router.post('/',auth(subjectRols.ADD_SUBJECT),multerMiddleHost({
    extensions:allowedExtensions.document
}).single('file'),expressAsyncHandler(SC.addSubject))





export default router