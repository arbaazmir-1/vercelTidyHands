const User = require("../models/userModel");
const connectDB = require("../utils/db");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const { protect } = require("../utils/authMiddleware");

const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      const user = await User.create({
        name,
        email,
        password,
        phone,
      });
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          token: generateToken(user._id),
        });
      }
    } else {
      const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
      res.status(statusCode);
      res.json({
        message: "User already exists, please login",
      });
    }
  } catch (err) {
    const statusCode = res.statusCode === 200 ? 401 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    connectDB();
    const user = await User.findOne({ email });

    if (user) {
      if (await user.matchPassword(password)) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          token: generateToken(user._id),
        });
      } else {
        const statusCode = res.statusCode === 200 ? 401 : res.statusCode;
        res.status(statusCode);
        res.json({
          message: "Invalid email or password",
        });
      }
    } else {
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      res.status(statusCode);
      res.json({
        message: "No user found",
      });
    }
  } catch (err) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }
};
const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    connectDB();
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const resetPassword = await User.findOneAndUpdate(
        { email },
        { $set: { password: await bcrypt.hash(password, 10) } },
        { new: true }
      );
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Logged out" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  await protect(req, res);
  connectDB();
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.password = undefined;
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  resetPassword,
  logoutUser,
  getUser,
};
