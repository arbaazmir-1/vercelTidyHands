const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const connectDB = require("../utils/db");
const User = require("../models/userModel");
const Gig = require("../models/gigModel");
const dotenv = require("dotenv");
const ActiveHelper = require("../models/activeSellerModel");
dotenv.config();
const users = [
  {
    name: "User 1",
    email: "user1@email.com",
    password: bcrypt.hashSync("123456", 10),
    avatar: "https://i.pravatar.cc/150?img=1",
    phone: "1234567890",
    address: "Address 1",
    verified: true,
  },
  {
    name: "User 2",
    email: "user2@email.com",
    password: bcrypt.hashSync("123456", 10),
    avatar: "https://i.pravatar.cc/150?img=2",
    phone: "1234567890",
    address: "Address 2",
    verified: true,
  },
];

const gigs = [
  {
    title: "I need a cleaner",
    description: "I need a cleaner to clean my house",
    price: 10,
    image: "https://i.pravatar.cc/150?img=1",
    deliveryTime: 2,
    category: "cleaning",
    needWithin: 2,
    coords: [25.370535428138616, 55.4788618475773],
    noOfApplicants: 0,
  },
  {
    title: "I need a cook",
    description: "I need a cook to cook my food",
    price: 20,
    image: "https://i.pravatar.cc/150?img=2",
    deliveryTime: 2,
    category: "cooking",
    needWithin: 1,
    coords: [25.424286330646822, 55.56713445537544],
    noOfApplicants: 3,
  },
  {
    title: "I need a driver",
    description: "I need a driver to drive my car",
    price: 30,
    image: "https://i.pravatar.cc/150?img=3",
    deliveryTime: 2,
    category: "driving",
    needWithin: 3,
    coords: [25.370535428138616, 55.4788618475773],
    noOfApplicants: 8,
  },
];

const actHelp = [
  {
    typeOfService: ["cleaning", "cooking", "driving"],
    latLong: [25.370535428138616, 55.4788618475773],
    location: "Dubai",
    noOfHires: 0,
    price: 10,
  },
  {
    typeOfService: ["cleaning", "cooking", "driving"],
    latLong: [25.370535428138616, 55.4788618475773],
    location: "Dubai",
    noOfHires: 0,
    price: 20,
  },
];
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Gig.deleteMany();
    await ActiveHelper.deleteMany();

    const user = await User.insertMany(users);

    const sampleGigs = gigs.map((gig) => {
      return { ...gig, buyer: user[0]._id };
    });
    const sampleActHelp = actHelp.map((act) => {
      return { ...act, seller: user[0]._id };
    });
    await ActiveHelper.insertMany(sampleActHelp);
    await Gig.insertMany(sampleGigs);

    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Gig.deleteMany();

    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
