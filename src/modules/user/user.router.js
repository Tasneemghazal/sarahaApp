import {Router} from "express";
import { getProfile, uploadImg } from "./user.controller.js";
import auth from "../../middleware/auth.js";
import { errorHandler } from "../../services/errorHandler.js";
import uploadFile, { fileValid } from "../../services/multer.js";
const userRouter= Router();
userRouter.get('/getProfile',errorHandler(auth),errorHandler(getProfile));
userRouter.patch('/profileImg',auth,uploadFile(fileValid.image).single('image'),errorHandler(uploadImg));

export default userRouter;