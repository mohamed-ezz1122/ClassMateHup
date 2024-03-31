import mongoose from "mongoose"

const db_connection=async ()=>{
    await mongoose.connect(process.env.DB_CONNECTION).then(res=>{console.log('connected..!');})
    .catch(error=>{console.log(`connected failed ${error}`);})
}
export default db_connection