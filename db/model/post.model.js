import { Schema, Types, model } from "mongoose";

const postSchema=new Schema({

    content:{
        type:String,
        required:true,
        trim:true
    },
    subjectName:{
        type:String,
        required:true
    },
    createdBy:{
        type:Types.ObjectId,ref:"User",
        required:true
    },
    updatedBy:{
        type:Types.ObjectId,ref:"User",
        required:true
    },
    SubjectId:{
        type:Types.ObjectId,ref:"Subject",
        required:true
    },
    images:[
        {
            secure_url: { type: String,  },
            public_id: { type: String, unique: true },
        }
    ]

},{timestamps:true})
export default model('Post',postSchema)