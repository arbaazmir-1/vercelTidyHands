const mongoose = require("mongoose");
const User = require("./userModel");

const { Schema } = mongoose;

const gigSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  needWithin: {
    type: Date,
  },
  category: {
    type: String,
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timePosted: {
    type: Date,
    default: Date.now(),
  },
  coords: {
    type: [Number],
    index: "2dsphere",
    required: true,
  },
  noOfApplicants: {
    type: Number,
    default: 0,
  },
});

//on delete gig, delete gig from user's gigsPosted array

gigSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await User.findByIdAndUpdate(doc.buyer, { $pull: { gigsPosted: doc._id } });
  }
});

const Gig = mongoose.model("Gig", gigSchema);
module.exports = Gig;
