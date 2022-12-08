const {
  registerUser,
  loginUser,
  resetPassword,
  logoutUser,
  getUser,
} = require("../utils/usermethods");

export default async (req, res) => {
  //check if there is a param in the url
  const { work } = req.query;
  if (req.method === "POST" && work === "register") {
    await registerUser(req, res);
  } else if (req.method === "POST" && work === "login") {
    await loginUser(req, res);
  } else if (req.method === "POST" && work === "resetpassword") {
    await resetPassword(req, res);
  } else if (req.method === "POST" && work === "logout") {
    await logoutUser(req, res);
  } else if (req.method === "GET" && work === "getuser") {
    await getUser(req, res);
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
};
