const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const generateToken = (id) => {
  if (!id) {
    throw new Error("No id provided");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = generateToken;
