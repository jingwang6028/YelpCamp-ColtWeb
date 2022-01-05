const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const opts = { toJSON: { virtuals: true } };

const imageSchema = new Schema({
  url: String,
  filename: String,
});

// create a virtual property "thumbnail" to make image looks smaller
imageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const CampgroundSchema = new Schema({
  title: String,
  images: [imageSchema],
  price: Number,
  description: String,
  location: String,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}, opts);

CampgroundSchema.virtual("properties.popUpMarkup").get(function () {
  return `<a href="/campgrounds/${this._id}">${this.title}</a>`;
});

// when delete campground the associated reviews deleted too
CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
