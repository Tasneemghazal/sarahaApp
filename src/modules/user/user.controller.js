import userModel from "../../../db/models/user.model.js"

export const getProfile = async(req,res)=>{
    const profile = await userModel.findById(req.user._id);
    return res.status(200).json({message:"success",profile});
}