import connectDB from "../../db/connection.js";
import authRouter from "./auth/auth.router.js";
import msgRouter from "./message/message.router.js";
import userRouter from "./user/user.router.js";

const initApp =(app,express)=>{
    connectDB();
    app.use(express.json());
    app.use('/auth',authRouter);
    app.use('/user',userRouter);
    app.use('/msg',msgRouter);
    app.use((err,req,res,next)=>{
        if(err){
            return res.json({message:err.message||"invalid format"});
        }
    })
}
export default initApp;