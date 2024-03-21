import connectDB from "../../db/connection.js";
import authRouter from "./auth/auth.router.js";
import userRouter from "./user/user.router.js";

const initApp =(app,express)=>{
    connectDB();
    app.use(express.json());
    app.use('/auth',authRouter);
    app.use('/user',userRouter);
}
export default initApp;