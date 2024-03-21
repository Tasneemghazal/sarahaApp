import {Router} from "express";
import { getProfile } from "./user.controller.js";
import auth from "../../middleware/auth.js";
import { errorHandler } from "../../services/errorHandler.js";
const userRouter= Router();
userRouter.get('/getProfile',errorHandler(auth),errorHandler(getProfile));

export default userRouter;