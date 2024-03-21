import mongoose from "mongoose";
 const connectDB= async()=>{
    return mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("connection established")
    }).catch((e)=>{
        console.log(`Error connecting : ${e}`);
    })
}
export default connectDB;