import { Schema, model} from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: Number,
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

 const userModel = model("User", userSchema);
 export default userModel;
