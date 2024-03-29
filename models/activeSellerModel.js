const mongoose = require("mongoose");

const { Schema } = mongoose;

const activeHelperSchema = new Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  typeOfService: [
    {
      type: String,
      required: true,
    },
  ],
  location: {
    type: String,
  },
  coords: {
    type: [Number],
    required: true,
    index: "2dsphere",
  },
  timePosted: {
    type: Date,
    default: Date.now,
  },

  noOfHires: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
});
const ActiveHelper = mongoose.model("ActiveHelper", activeHelperSchema);
module.exports = ActiveHelper;
