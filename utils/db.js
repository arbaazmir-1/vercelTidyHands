const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DATABASE UP AND Running: ${conn.connection.host}`);
  } catch (e) {
    console.log(`Error : ${e.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
