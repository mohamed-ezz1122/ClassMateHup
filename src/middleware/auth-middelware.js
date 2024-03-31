import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import userModel from '../../db/model/user.model.js'


export const auth = (accessRoles)=>{
try {
    return async (req,res,next) =>{
        const {accesstoken}=req.headers
        if(!accesstoken)return next(new Error('please log in first ',{cause:400}))
    
        if(!accesstoken.startsWith(process.env.TOKEN_PREFIX))return next(new Error('token schema faild ',{cause:409}))
    
        const token=accesstoken.split(process.env.TOKEN_PREFIX)[1]
    
        const decodedToken=jwt.verify(token,process.env.SIGIN_SIGNATCHER)
    
        if (!decodedToken || !decodedToken.id) return next(new Error('invalid token payload', { cause: 400 }))
       
        //check user 
        const userCheck = await userModel.findById(decodedToken.id)
        if(!userCheck)return next({msg:'user Not found',cause:404})
        
        //auhtorization
        if (!accessRoles.includes(userCheck.role)) return next(new Error('unauthorized', { cause: 401 }))
        //create authUser
        req.authUser=userCheck
    
        next()
    
    
    
    
    }
} catch (error) {
    console.log(error);
            next(new Error('catch error in auth middleware', { cause: 500 }))
}
}