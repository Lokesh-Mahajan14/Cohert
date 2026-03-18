import express from 'express'
import {upload} from '../config/multer.js'
import { protect } from '../middleware/auth.js'
import { addPost, getPosts, likePost } from '../controller/postController.js'

const postRouter=express.Router()

postRouter.post('/add',upload.array('images',4),protect,addPost)
postRouter.get('/feed',protect,getPosts)
postRouter.post('/like',protect,likePost)

export default postRouter