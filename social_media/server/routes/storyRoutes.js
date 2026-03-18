import { addUserStory, getUserStory } from "../controller/StoryController.js"


const storyRouter=express.Router()

storyRouter.post('/create',upload.single('media'),protect ,addUserStory)
storyRouter.get('/get',protect ,getUserStory)

export default storyRouter