const jwt = require("jsonwebtoken");
export const generateToken = (id) => {
  if (!id) {
    throw new Error("No id provided");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
