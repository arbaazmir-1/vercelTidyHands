import connectDB from "../../utils/db";
import Gig from "../../models/gigModel";
import User from "../../models/userModel";
export default async (req, res) => {
  let requestType = req.method;
  if (requestType === "GET") {
    await connectDB();
    const gigs = await Gig.find({}).populate("buyer", "name phone avatar");

    res.json(gigs);
  } else if (requestType === "POST") {
    dbConnect();
    const { gig, description, price, image, deliveryTime } = req.body;
    res.json({ gig, description, price, image, deliveryTime });
  }
};
