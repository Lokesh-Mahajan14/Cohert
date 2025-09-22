


const express=require('express')
const userRouter=express.Router();
const {userAuthVerification}=require("../middleware/index")

const {registerUser,loginUser,logout}=require("../controllers/user-controler");

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post("/logout",logout);

userRouter.post('/auth',userAuthVerification);

module.exports=userRouter;