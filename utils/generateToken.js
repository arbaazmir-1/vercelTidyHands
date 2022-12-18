const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  if (!id) {
    throw new Error("No id provided");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = generateToken;
