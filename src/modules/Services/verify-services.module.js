import nodemailer from "nodemailer"
export const sendEmailServics= async({
    to='',
        subject='no-replay',
        message='<h2>no-msg</h2>',
        attachments = []
})=>{

const transport=nodemailer.createTransport({
    host:'localhost',
    service:"gmail",
    port:587,
    secure:false,
    auth:{
        user:process.env.EMAIL,

        pass:process.env.PASSWORD   
    }
})
const info=await transport.sendMail({
    from: `"Fred fo 😉" <${process.env.EMAIL}>`, 
    to, 
    subject, 
    html: message, 
    attachments
})
return info.accepted.length ? true : false



}