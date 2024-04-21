import { Schema, Types, model} from "mongoose";

const postSchema = new Schema(
  {
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    image:{
        type:Object
    },
    userId:{
        type:Types.ObjectId,
        ref:'User'
    }
  }
);

 const postModel = model("Post", postSchema);
 export default postModel;
