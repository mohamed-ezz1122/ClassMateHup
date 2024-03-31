import slugify from "slugify"
import subjectModel from "../../../db/model/subject.model.js"
import User from "../../../db/model/user.model.js"
import { systemRoles } from "../../utils/system-roles.js"
import { generateUniqueString } from "../../utils/generate-uniqe-string.js"
import cloudinaryConnection from "../../utils/cloudaniry-midlleware.js"


export const addSubject= async (req,res,next)=>{
    const {title,desc,term,acadimcYears}=req.body
    // const {doctorId}=req.query
    const {id:addedBy}=req.authUser
 const   doctorId=req.authUser.id
//chech name
const subjectCheck=await subjectModel.findOne({title})
if(subjectCheck)return next({msg:"subject oready added",cause:400})
//create slug
const slug=slugify(title,'-')
//check doctors id
const doctorsCheck=await User.findById(doctorId)
if(!doctorsCheck)return next({msg:"user Not found",cause:404})
if(doctorsCheck.role!==systemRoles.DOCTORS)return next({msg:"user Not a doctor",cause:500})

const subjectInfo={
    term,acadimcYears,doctorId
}
console.log(subjectInfo);

//cloudaniry
let subjectData=[]
if(!req.file)return next({msg:"plese uploade file ",cause:404})
const folderId=generateUniqueString(5)
const {public_id,secure_url}= await cloudinaryConnection().uploader.upload(req.file.path,{
    folder:`${process.env.MAIN_FOLDER_UPLOAD}/subject/${folderId}`,
    folderId
})


subjectData.push({public_id,secure_url})
//rolle back
req.folder=`${process.env.MAIN_FOLDER_UPLOAD}/subject/${folderId}`
//create oject
const subjectObject={
    title,desc,addedBy,subjectInfo,subjectData,slug
}

const newSubject=await subjectModel.create(subjectObject)
//rolle back
req.docomemt={model:subjectModel,id:newSubject._id}
res.status(200).json({
    msg:"subject created success",
    data:newSubject
})



    
    
}