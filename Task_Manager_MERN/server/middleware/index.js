const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuthVerification = async (req, res) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Token missing or invalid" });
  }

  try {
    const decoded = jwt.verify(token, "DEFAULT_SECRET_KEY");
    const userInfo = await User.findById(decoded.id).select("-password");

    if (!userInfo) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, userInfo });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "User not authenticated" });
  }
};

module.exports = { userAuthVerification };
