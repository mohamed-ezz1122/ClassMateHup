import db_connection from "../db/conection.js";
import { globalResponse } from "./middleware/globel-resbons.js";
import { rolleBackCreater } from "./middleware/rolleBack-create.js";
import { rolleBackUploader } from "./middleware/rolleback-upload.js";
import * as RC from "./utils/router.js";//router controiier

export const initiateApp=(express,app)=>{

    // console.log(port);
    
    const port=process.env.PORT
    app.use(express.json())
    
    
    app.use('/user',RC.userRouter)
    app.use('/subject',RC.subjectRouter)
    app.use('/post',RC.postRouter)
    
    
    
    
    
    
    app.use(globalResponse,rolleBackUploader,rolleBackCreater)
    db_connection()
    app.listen(port,console.log(`db-connected in port ${port}`))





}