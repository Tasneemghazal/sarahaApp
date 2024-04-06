
import { Router } from 'express';
import { confirmEmail, signIn, signUp } from './auth.controller.js';
import { errorHandler } from '../../services/errorHandler.js';
import validation from '../../middleware/validation.js';
import { signInSchema, signUpSchema } from './auth.validation.js';
const authRouter = Router();
authRouter.post('/signup',validation(signUpSchema) ,errorHandler(signUp));
authRouter.post('/signin',validation(signInSchema), errorHandler(signIn));
authRouter.get('/confirmEmail/:token',confirmEmail);
export default authRouter;