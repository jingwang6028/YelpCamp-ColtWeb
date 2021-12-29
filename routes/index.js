const express = require("express");
const router = express.Router();

const campgroundRoutes = require("./campgroundRoutes");
const reviewRoutes = require("./reviewRoutes");
const userRoutes = require("./userRoutes");

router.use("/campgrounds", campgroundRoutes);
router.use("/campgrounds/:id/reviews", reviewRoutes);
router.use("/", userRoutes);

module.exports = router;
