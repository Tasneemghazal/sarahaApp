import userModel from "../../../db/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { signInSchema, signUpSchema } from "./auth.validation.js";
export const signUp = async (req, res) => {
    const { userName, email, password } = req.body;
    const signUpValidation = signUpSchema.validate(req.body,{abortEarly:false});
    if(signUpValidation.error){
      return res.json({message:"validation error",error:signUpValidation.error});
    }
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(409).json({ error: "user already exists" });
    }
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUND)
    );
    const user = await userModel.create({
      userName,
      email,
      password: hashPassword,
    });
    if (!user) {
      return res.status(400).json({ error: "user doesn't created successfully" });
    }
    return res.status(201).json({message:"user created successfully",user});
  
};
export const signIn = async (req, res) => {
      const {email, password } = req.body;
     
      const existUser = await userModel.findOne({ email }).select('userName password');
      if (!existUser) {
        return res.status(400).json({ error: "user does not  exist" });
      }
      const match = await bcrypt.compare(password,existUser.password);
      if(!match){
        return res.status(400).json({ message:"invalid password"});
      }
      const token = await jwt.sign({id:existUser._id},process.env.SIGNIN_SIG)
      return res.status(200).json({ message:"success",token });
  };
  