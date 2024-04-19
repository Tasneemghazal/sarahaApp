import userModel from "../../../db/models/user.model.js"
import cloudinary from "../../services/cloudinary.js";

export const getProfile = async(req,res)=>{
    const profile = await userModel.findById(req.user._id);
    return res.status(200).json({message:"success",profile});
}

export const uploadImg=async(req,res,next)=>{
     const {secure_url}=await cloudinary.uploader.upload(req.file.path)
     const user = await userModel.findByIdAndUpdate(req.user._id,{profileImg:secure_url},{new:true});
     return res.json(user);
}