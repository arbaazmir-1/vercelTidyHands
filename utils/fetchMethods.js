import connectDB from "./db";
import Gig from "../models/gigModel";
import User from "../models/userModel";
import Report from "../models/reportModel";
import ActiveHelper from "../models/activeSellerModel";
const { protect } = require("./authMiddleware");

const fetchHomeGigs = async (req, res) => {
  await protect(req, res);
  let { long, lat } = req.query;
  try {
    await connectDB();
    let distance = 20;

    //find gigs within 10km radius, last 10 gigs

    const gigs = await Gig.find({
      coords: {
        $near: {
          $geometry: {
            type: "Point",

            coordinates: [long, lat],
          },
          $maxDistance: distance * 1000,
        },
      },
    })
      .sort({ _id: -1 })
      .limit(15)
      .populate("buyer", "name phone avatar");
    if (!gigs) {
      return res.status(404).json({ message: "No gigs found" });
    }

    const activeHelpers = await ActiveHelper.find({
      coords: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [long, lat],
          },
          $maxDistance: distance * 1000,
        },
      },
    })
      .sort({ _id: -1 })
      .limit(15)
      .populate("seller", "name phone avatar");

    if (!activeHelpers) {
      activeHelpers = [];
    }

    let data = {
      gigs,
      gigsRadius: distance,
      activeHelpers,
    };

    res.json(data);
  } catch (err) {
    let error = err;
    //check if jwt token is expired
    if (err.name === "TokenExpiredError") {
      error = "Token expired, please login again";
    }
    res.status(500).json({ error });
  }
};

const searchGigs = async (req, res) => {
  console.log("searching gigs");
  await protect(req, res);
  let { search } = req.query;
  let { long, lat } = req.query;
  let distance = 20;
  try {
    await connectDB();

    const gigs = await Gig.find({
      title: { $regex: `${search}`, $options: "i" },
      coords: {
        $near: {
          $geometry: {
            type: "Point",

            coordinates: [long, lat],
          },
          $maxDistance: distance * 1000,
        },
      },
    })
      .sort({ _id: -1 })
      .populate("buyer", "name phone avatar");

    if (!gigs) {
      return res.status(404).json({ message: "No gigs found" });
    } else {
      res.status(200).json(gigs);
    }
  } catch (err) {
    let error = err;
    //check if jwt token is expired
    if (err.name === "TokenExpiredError") {
      error = "Token expired, please login again";
    }
    res.status(500).json({ error });
  }
};

const report = async (req, res) => {
  await protect(req, res);
  const { title, description } = req.body;
  try {
    await connectDB();
    const bug = await Report.create({
      title,
      description,
      user: req.user._id,
    });
    res.status(200).json("success");
  } catch (err) {
    let error = err;
    //check if jwt token is expired
    if (err.name === "TokenExpiredError") {
      error = "Token expired, please login again";
    }
    res.status(500).json({ error });
  }
};

module.exports = {
  fetchHomeGigs,
  searchGigs,
  report,
};
