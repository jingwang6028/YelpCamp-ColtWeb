const mongoose = require("mongoose");
const Campground = require("../models/campground");

const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

// set up mongoose connection
mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "61ccd89b591e998d873a3fab",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: "Point",
        coordinates: [-113.1331, 47.0202]
      },
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      price: price,
      images: [
        {
          url: "https://res.cloudinary.com/dz0xzud43/image/upload/v1641253189/YelpCamp-ColtWeb/y046rsdcnnjxj6chfx5d.jpg",
          filename: "YelpCamp-ColtWeb/y046rsdcnnjxj6chfx5d",
        },
        {
          url: "https://res.cloudinary.com/dz0xzud43/image/upload/v1641253190/YelpCamp-ColtWeb/yptegwcjnii7iwdxh9q0.jpg",
          filename: "YelpCamp-ColtWeb/yptegwcjnii7iwdxh9q0",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
