import connectDB from "./db";
import Gig from "../models/gigModel";
import User from "../models/userModel";
import ActiveHelper from "../models/activeSellerModel";
const { protect } = require("./authMiddleware");

const fetchHomeGigs = async (req, res) => {
  await protect(req, res);
  let { long, lat } = req.query;
  try {
    await connectDB();
    let distance = 20;
    const user = await User.findById(req.user._id);
    if (user) {
      if (user.searchLocation.length === 0) {
        user.searchLocation.push([long, lat]);
        await user.save();
      } else {
        for (let i = 0; i < user.searchLocation.length; i++) {
          if (
            user.searchLocation[i][0] === long &&
            user.searchLocation[i][1] === lat
          ) {
            console.log("location already exists");
          } else {
            user.searchLocation.push([long, lat]);
            await user.save();
          }
        }
      }
    }

    //find gigs within 10km radius
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
    }).populate("buyer", "name phone avatar");
    if (!gigs) {
      return res.status(404).json({ message: "No gigs found" });
    }

    const activeHelpers = await ActiveHelper.find({}).populate(
      "seller",
      "name phone avatar"
    );
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

module.exports = {
  fetchHomeGigs,
  searchGigs,
};
