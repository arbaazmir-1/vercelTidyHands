const jtw = require("jsonwebtoken");
const User = require("../models/userModel");
const connectDB = require("../utils/db");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jtw.verify(token, process.env.JWT_SECRET);
      connectDB();
      req.user = await User.findById(decoded.id).select("-password");
    } catch (e) {
      res.json({ error: e.message });
    }
  }
  if (!token) {
    res.json({ error: "Not authorized, no token" });
  }
};
module.exports = { protect };
