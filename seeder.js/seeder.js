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
    coords: [55.4788618475773, 25.424286330646822],
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
    coords: [55.4788618475773, 25.424286330646822],
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
    coords: [55.4788618475773, 25.424286330646822],
    noOfApplicants: 8,
  },
  {
    title: "I need a gardener",
    description: "I need a gardener to garden my garden",
    price: 40,
    image: "https://i.pravatar.cc/150?img=4",
    deliveryTime: 2,
    category: "gardening",
    needWithin: 4,

    coords: [101.60983276367188, 4.823666572570801],
    noOfApplicants: 0,
  },
  {
    title: "I need a cleaner for my car",
    description: "I need a cleaner to clean my car",
    price: 50,
    image: "https://i.pravatar.cc/150?img=5",
    deliveryTime: 2,
    category: "cleaning",
    needWithin: 5,
    coords: [101.60983276367188, 4.823666572570801],
    noOfApplicants: 0,
  },
  {
    title: "I need a cleaner for my house Badda Bangla",
    description: "I need a cleaner to clean my house",
    price: 60,
    image: "https://i.pravatar.cc/150?img=6",
    deliveryTime: 2,
    category: "cleaning",
    needWithin: 6,

    coords: [90.42163739752262, 23.758476258203537],
    noOfApplicants: 0,
  },
  {
    title: "আমার বাড়িতে একজন সাফ করতে হবে",
    description: "আমার বাড়িতে একজন সাফ করতে হবে",
    price: 70,
    image: "https://i.pravatar.cc/150?img=7",
    deliveryTime: 2,
    category: "cleaning",
    needWithin: 7,
    coords: [90.42163739752262, 23.758476258203537],
    noOfApplicants: 0,
  },
];

const actHelp = [
  {
    typeOfService: ["cleaning", "cooking", "driving"],
    coords: [55.4788618475773, 25.424286330646822],
    location: "Dubai",
    noOfHires: 0,
    price: 10,
  },
  {
    typeOfService: ["cleaning", "cooking", "driving"],
    coords: [55.4788618475773, 25.424286330646822],
    location: "Dubai",
    noOfHires: 0,
    price: 20,
  },
];
connectDB();

const importData = async () => {
  try {
    // await User.deleteMany();
    // await Gig.deleteMany();
    await ActiveHelper.deleteMany();

    // const user = await User.insertMany(users);

    const users = await User.find().sort({ _id: -1 }).limit(2);
    console.log(users.length);

    // const sampleGigs = gigs.map((gig) => {
    //   return { ...gig, buyer: user[0]._id };
    // });
    //loop through actHelp and add seller id from users

    const sampleActHelp = actHelp.map((act) => {
      return { ...act, seller: users[0]._id };
    });
    await ActiveHelper.insertMany(sampleActHelp);
    // await Gig.insertMany(sampleGigs);

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

    await ActiveHelper.deleteMany();
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
