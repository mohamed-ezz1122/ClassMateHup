export const rolleBackCreater=async(req,res,next)=>{
    if(req.docomemt){
        const {model,id}=req.docomemt
        await model.findByIdAndDelete(id)
    }
}