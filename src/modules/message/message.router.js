import {Router} from 'express';
import { getMessages, sendMsg } from './message.controller.js';
import auth from '../../middleware/auth.js';
const msgRouter = Router();
msgRouter.get('/',auth,getMessages);
msgRouter.post('/sendMsg/:recieverId',sendMsg);
export default msgRouter;