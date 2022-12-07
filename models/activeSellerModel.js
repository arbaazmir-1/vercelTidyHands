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
    required: true,
  },
  latLong: {
    type: [Number],
    required: true,
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
