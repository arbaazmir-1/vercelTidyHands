import connectDB from "./db";
import Gig from "../models/gigModel";
import User from "../models/userModel";

const createNewGig = async (req, res) => {
  const { title, description, price, coords, category } = req.body;
  try {
    await connectDB();
    const gig = await Gig.create({
      title,
      description,
      price,
      coords,
      buyer: req.user._id,
      category,
    });
    if (!gig) {
      return res.status(400).json({ message: "Gig not created" });
    }
    res.json({ message: "Gig created successfully", gig });
  } catch (err) {
    let error = err;
    //check if jwt token is expired
    if (err.name === "TokenExpiredError") {
      error = "Token expired, please login again";
    }
    res.status(500).json({ error });
  }
};

module.exports = { createNewGig };
