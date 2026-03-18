import express from 'express';
import { addUserStory, getUserStory } from "../controller/StoryController.js"
import { upload } from '../config/multer.js';
import { protect } from '../middleware/auth.js';


const storyRouter=express.Router()

storyRouter.post('/create',upload.single('media'),protect ,addUserStory)
storyRouter.get('/get',protect ,getUserStory)

export default storyRouter