import connectDB from "../../utils/db";
import Gig from "../../models/gigModel";
import User from "../../models/userModel";
import ActiveHelper from "../../models/activeSellerModel";
export default async (req, res) => {
  let requestType = req.method;
  if (requestType === "GET") {
    await connectDB();
    const gigs = await Gig.find({}).populate("buyer", "name phone avatar");
    const activeHelpers = await ActiveHelper.find({}).populate(
      "seller",
      "name phone avatar"
    );
    let data = {
      gigs,
      activeHelpers,
    };

    res.json(data);
  } else if (requestType === "POST") {
    dbConnect();
    const { gig, description, price, image, deliveryTime } = req.body;
    res.json({ gig, description, price, image, deliveryTime });
  }
};
