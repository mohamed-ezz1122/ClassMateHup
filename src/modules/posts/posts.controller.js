import postModel from "../../../db/model/post.model.js"
import subjectModel from "../../../db/model/subject.model.js"
import cloudinaryConnection from "../../utils/cloudaniry-midlleware.js"
import { generateUniqueString } from "../../utils/generate-uniqe-string.js"

//============add post ======>
export const addPost=async(req,res,next)=>{
    const {content,subjectName}=req.body
    const {id:createdBy}=req.authUser

    //check if subject found
    const subjectCheck=await subjectModel.findOne({title:subjectName})
    if(subjectCheck)return next ({msg:"subject not found",cause:404})

    //cloudinary
  if(req.file){
        
let images=[]

const folderId=generateUniqueString(5)
const {public_id,secure_url}= await cloudinaryConnection().uploader.upload(req.file.path,{
    folder:`${process.env.MAIN_FOLDER_UPLOAD}/subject/${subjectCheck.folderId}/post/${folderId}`,
    folderId
})

subjectId= subjectCheck._id

images.push({public_id,secure_url})
//rolle back
req.folder=`${process.env.MAIN_FOLDER_UPLOAD}/subject/${folderId}/post/${folderId}`
    }

const newPost=await postModel.create(
    {
        content,createdBy,subjectName,images,subjectId
    }
)
req.docomemt={model:subjectModel,id:newSubject._id}
res.status(200).json({
    msg:"post created success",
    data:newPost
})

}





//update Post =======>

export const updatePost=async(req,res,next)=>{
    const {content,title,oldePublicId}=req.body
    const {postId}=req.query
    const {id:createdBy}=req.authUser

    //subject ckeck
    const subjectCheck =await subjectModel.findOne({title})
    //ckeck image 
    // if(oldePublicId){
        
    // if(!req.file)return next({ cause: 400, message: 'Please select new image' })
        
    //     let images=[]
        
    //     const folderPath = product.Images[0].public_id.split(`${product.folderId}/`)[0]
    //     const {public_id,secure_url}= await cloudinaryConnection().uploader.upload(req.file.path,{
    //         folder:`${process.env.MAIN_FOLDER_UPLOAD}/subject/${subjectCheck.folderId}/post/${folderId}`,
    //         folderId
    //     })
        
    //     subjectId= subjectCheck._id
        
    //     images.push({public_id,secure_url})
    //     //rolle back
    //     req.folder=`${process.env.MAIN_FOLDER_UPLOAD}/subject/${folderId}/post/${folderId}`
            
    // }
        

    const isPostExists =await postModel.findByIdAndUpdate({_id:postId,createdBy},{content,})



}
