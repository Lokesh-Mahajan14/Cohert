import express from 'express'
import { getChatMessages, sendMessage, sseController } from '../controller/messageController';
import { protect } from '../middleware/auth';
import { upload } from '../config/multer';

const messageRouter=express.Router();

messageRouter.post('/send',upload.single('image'),protect,sendMessage);
messageRouter.get('/:userId',sseController)
messageRouter.post('/get',protect,getChatMessages)

export default messageRouter;