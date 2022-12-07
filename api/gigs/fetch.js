import connectDB from "../../utils/db";
import Gig from "../../models/gigModel";
import User from "../../models/userModel";
import ActiveHelper from "../../models/activeSellerModel";
export default async (req, res) => {
  let requestType = req.method;
  if (requestType === "GET") {
    try {
      let { long, lat } = req.query;
      console.log(long, lat);
      await connectDB();
      let distance = 11;

      //find gigs within 10km radius
      const gigs = await Gig.find({
        coords: {
          $near: {
            $geometry: {
              type: "Point",
              spherical: true,
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
      res.status(500).json({ message: err });
    }
  } else if (requestType === "POST") {
    dbConnect();
    const { gig, description, price, image, deliveryTime } = req.body;
    res.json({ gig, description, price, image, deliveryTime });
  }
};
