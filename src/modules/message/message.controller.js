import messageModel from "../../../db/models/message.model.js";
import userModel from "../../../db/models/user.model.js";
export const getMessages = async (req,res)=>{
    const messages = await messageModel.find({recieverId:req.user._id});
    return res.json({message: messages});
    
}
export const sendMsg = async (req,res)=>{
    const { recieverId} = req.params;
    const {msg} = req.body;
    console.log(msg)
    const user = await userModel.findById(recieverId);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    const createdMessage = await messageModel.create({content:msg,recieverId});
    return res.status(200).json({message:"ok" ,createdMessage});
    
}