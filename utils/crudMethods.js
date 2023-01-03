import connectDB from "./db";
import Gig from "../models/gigModel";
import User from "../models/userModel";

const createNewGig = async (req, res) => {
  const { title, description, price, location, category, timeLimit } = req.body;

  try {
    await connectDB();
    const gig = await Gig.create({
      title,
      description,
      price,
      coords: location,
      buyer: req.user._id,
      category,
      timePosted: Date.now(),
      needWithin: timeLimit,
    });
    const user = await User.findById(req.user._id);

    user.gigsPosted.push(gig._id);
    await user.save();

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
const fetchSingleGig = async (req, res) => {
  const { id } = req.query;
  try {
    await connectDB();
    const gig = await Gig.findById(id).populate("buyer", "name phone email");
    if (!gig) {
      return res.status(400).json({ message: "Gig not found" });
    }

    res.json({ gig });
  } catch (err) {
    let error = err;
    //check if jwt token is expired
    if (err.name === "TokenExpiredError") {
      error = "Token expired, please login again";
    }
    res.status(500).json({ error });
  }
};

module.exports = { createNewGig, fetchSingleGig };
