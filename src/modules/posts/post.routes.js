import { Router } from "express";
import * as PC  from "./posts.controller.js";
import expressAsyncHandler from "express-async-handler";
import { multerMiddleHost } from "../../middleware/multer-middleware.js";
import { allowedExtensions } from "../../utils/allowed-extntion.js";
import { auth } from "../../middleware/auth-middelware.js";

const router=Router()

router.post('/addPost',auth(),multerMiddleHost(
    {
    extensions:allowedExtensions.image
}).array("image",7),expressAsyncHandler(PC.addPost))






export default router