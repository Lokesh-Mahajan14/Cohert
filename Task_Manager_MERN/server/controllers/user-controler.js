const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

// Joi schemas
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = registerSchema.validate({ name, email, password });
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User email already exists! Please try another",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ name, email, password: hashPassword });

    const token = generateToken(newUser._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false, 
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userData: {
        name: newUser.name,
        email: newUser.email,
        _id: newUser._id,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong! Please try again" });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    const getUser = await User.findOne({ email });
    if (!getUser) {
      return res.json({ message: "Incorrect email", success: false });
    }

    const checkAuth = await bcrypt.compare(password, getUser.password);
    if (!checkAuth) {
      return res.json({ message: "Incorrect password", success: false });
    }

    const token = generateToken(getUser._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    return res.status(200).json({ success: true, message: "User logged in" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong! Please try again" });
  }
};

// Logout
const logout = async (req, res) => {
  res.cookie("token", "", { withCredentials: true, httpOnly: false });
  return res.status(200).json({ success: true, message: "Logout successfully" });
};

module.exports = { registerUser, loginUser, logout };
