import mongoose, { Schema, Types, model } from "mongoose";
import { systemRoles } from "../../src/utils/system-roles.js";

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
        
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    rePassword: {
        type: String,
        required: true,
        minlength: 8,
    },
    phoneNumbers: {
        type: String,
        required: true,
        unique:true,
    },
    role: {
        type: String,
        enum: [systemRoles.STUDENT,systemRoles.SUBER_ADMIN,systemRoles.DOCTORS],
        default: systemRoles.STUDENT
    },isEmailVerified: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    
    academicYear:{
        type:String,
        required:true,
        enum:['first Year','Second Year','Third Year','last Year'],
        default:"first Year",
        
    }
},{timestamps:true})




export default model('User',userSchema)