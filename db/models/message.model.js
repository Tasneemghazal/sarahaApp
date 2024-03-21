import { Schema, Types } from "mongoose";

const messageSchema = new Schema(
  {
    content:{
        type:String,
        required:true,
    },
    recieverId:{
        type:Types.ObjectId,
        required:true,
    }
  },
  { timestamps: true }
);

export default messageModel = model("Message", messageSchema);
