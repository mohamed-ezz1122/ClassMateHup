
//user check

// import User from "../../db/model/user.model.js"

// export const userCheck=async({email,phoneNumbers})=>{
     
//   const user=  await User.findOne({$or:[{email},{phoneNumbers}]})
//   if(!user)return res.status(404).json({
    
//     msg:"user not found"

//   })
//     return user
// }