import jwt from "jsonwebtoken";
import userModel from "../../db/models/user.model.js";

const auth =async (req,res,next)=>{
    const {authorization} = req.headers;
      if(!authorization.startsWith(process.env.BEARERKEY)){
        return res.json({message:"invalid authorization"});
      }
      const token =authorization.split(process.env.BEARERKEY)[1];
      const decoded = await jwt.verify(token,process.env.SIGNIN_SIG);
      const authUser = await userModel.findById(decoded.id);
      req.user=authUser;
      next();
}
export default auth;