const jwt = require("jsonwebtoken");
export const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || import.meta.env.VITE_TEST_JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};
