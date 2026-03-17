import express from "express";

import {
  getUserData,
  followUser,
  unfollowUser,
  updateUserData,
  discoverUser,
  sendConnectionRequest,
  acceptConnectionRequest,
  getUserConnections
} from "../controller/userController.js";

import { protect } from "../middleware/auth.js";
import { upload } from "../config/multer.js";

const userRouter = express.Router();

userRouter.get("/data", protect, getUserData);

userRouter.post(
  "/update",
  protect,
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 }
  ]),
  updateUserData
);

userRouter.post("/discover", protect, discoverUser);
userRouter.post("/follow", protect, followUser);
userRouter.post("/unfollow", protect, unfollowUser);
userRouter.post("/connect", protect, sendConnectionRequest);
userRouter.post("/accept", protect, acceptConnectionRequest);
userRouter.get("/connections", protect, getUserConnections);



export default userRouter;
