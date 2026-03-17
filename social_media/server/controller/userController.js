import { messageInRaw } from "svix";
import imagekit from "../config/imagekit.js";
import Connection from "../models/connection.js";
import User from "../models/User.js";
import fs from "fs";

/* ===================== GET USER DATA ===================== */
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.auth();

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (e) {
    console.error(e);
    res.json({ success: false, message: e.message });
  }
};

/* ===================== UPDATE USER DATA ===================== */
export const updateUserData = async (req, res) => {
  try {
    const { userId } = req.auth();
    let { username, bio, location, full_name } = req.body;

    const tempUser = await User.findById(userId);
    if (!tempUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // keep old username if not sent
    if (!username) {
      username = tempUser.username;
    }

    // username availability check
    if (username?.trim() && username !== tempUser.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }
    }

    const updatedData = {
      username,
      bio,
      location,
      full_name,
    };

    /* ===== FILES ===== */
    const profile = req.files?.profile?.[0];
    const cover = req.files?.cover?.[0];

    /* ===== PROFILE IMAGE ===== */
    if (profile) {
      const buffer = fs.readFileSync(profile.path);

      const response = await imagekit.upload({
        file: buffer,
        fileName: profile.originalname,
      });

      const url = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "512" },
        ],
      });

      updatedData.profile_picture = url;
      fs.unlinkSync(profile.path);
    }

    /* ===== COVER IMAGE ===== */
    if (cover) {
      const buffer = fs.readFileSync(cover.path);

      const response = await imagekit.upload({
        file: buffer,
        fileName: cover.originalname,
      });

      const url = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });

      updatedData.cover_photo = url;
      fs.unlinkSync(cover.path);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

/* ===================== DISCOVER USER ===================== */
export const discoverUser = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { input } = req.body;

    const allUsers = await User.find({
      $or: [
        { username: new RegExp(input, "i") },
        { email: new RegExp(input, "i") },
        { full_name: new RegExp(input, "i") },
        { location: new RegExp(input, "i") },
      ],
    });

    const filteredUsers = allUsers.filter(
      user => user._id.toString() !== userId
    );

    res.json({ success: true, user: filteredUsers });
  } catch (e) {
    console.error(e);
    res.json({ success: false, message: e.message });
  }
};

/* ===================== FOLLOW USER ===================== */
export const followUser = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    if (userId === id) {
      return res.json({ success: false, message: "You cannot follow yourself" });
    }

    const user = await User.findById(userId);
    if (user.follwing.includes(id)) {
      return res.json({
        success: false,
        message: "You are already following this user",
      });
    }

    user.follwing.push(id);
    await user.save();

    const toUser = await User.findById(id);
    toUser.follwers.push(userId);
    await toUser.save();

    res.json({ success: true, message: "Now you are following this user" });
  } catch (e) {
    console.error(e);
    res.json({ success: false, message: e.message });
  }
};

/* ===================== UNFOLLOW USER ===================== */
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const user = await User.findById(userId);
    user.follwing = user.follwing.filter(
      uid => uid.toString() !== id
    );
    await user.save();

    const toUser = await User.findById(id);
    toUser.follwers = toUser.follwers.filter(
      uid => uid.toString() !== userId
    );
    await toUser.save();

    res.json({
      success: true,
      message: "You are no longer following this user",
    });
  } catch (e) {
    console.error(e);
    res.json({ success: false, message: e.message });
  }
};

//send connection request

export const sendConnectionRequest=async(req,res)=>{
  try{
    const {userId}=req.auth();
    const {id}=req.body;
    const last24Hours=new Date(Date.now()- 24*60*60*1000)
    const connectionRequests=await Connection.find({
      from_user_id:userId,
      created_at:{$gt:last24Hours}
    })
    if(connectionRequests.length>=20){
      return res.json({success:false,message:"You have send more than 20 connection requests in the last 24 hours"})

    }
    const connection=await Connection.findOne({
      $or:[
        {from_user_id:userId,to_user_id:id},
        {from_user_id:id,to_user_id:userId}
      ]
    })
    if(!connection){
      await Connection.create({
        from_user_id:userId,
        to_user_id:id,
      })
      return res.json({success:true,message:"Connection request sent successfully"})
    }else if(connection && connection.status==="accepted"){
        return res.json({success:false,message:"You already connected"})   

    }
    return res.json({success:false,message:"Connection request pending!"})


  }catch(e){
      return res.json({success:false,message:e.message})
  }


}

export const getUserConnections = async (req, res) => {
  try {
    const { userId } = req.auth();

    const user = await User.findById(userId)
      .select("connections follwers follwing")
      .populate("connections follwers follwing", "username profile_picture")
      .lean();

    const pendingConnections = await Connection.find({
      to_user_id: userId,
      status: "pending",
    })
      .populate("from_user_id", "username profile_picture")
      .lean();

    res.json({
      success: true,
      connections: user.connections,
      followers: user.follwers,
      following: user.follwing,
      pendingConnections: pendingConnections.map(
        c => c.from_user_id
      ),
    });

  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};


export const acceptConnectionRequest=async(req,res)=>{
  try{
    const {userId}=req.auth();
    const {id}=req.body;

    const connection=await Connection.findOne({
      from_user_id:id,to_user_id:userId
    })
    if(!connection){
      return res.json({success:false,message:'connection not found'})

    }
    const user=await User.findById(userId)
    user.connections.push(id);
    await user.save();

    const touser=await User.findById(id)
    touser.connections.push(userId);
    await touser.save();

    connection.status='accepted';
    await connection.save();

    res.json({success:true,message:"Connection accepted successfully"});

  }catch(e){
      return res.json({success:false,message:e.message})
  }
} 