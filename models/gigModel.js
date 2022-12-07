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
    type: Number,
    required: true,
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
    default: Date.now,
  },
  latLong: {
    type: [Number],
    required: true,
  },
  noOfApplicants: {
    type: Number,
    default: 0,
  },
});

const Gig = mongoose.model("Gig", gigSchema);
module.exports = Gig;
