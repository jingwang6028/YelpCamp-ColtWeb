const express = require("express");
const router = express.Router();

const campgroundRoutes = require("./campgroundRoutes");
const reviewRoutes = require("./reviewRoutes");

router.use("/campgrounds", campgroundRoutes);
router.use("/campgrounds/:id/reviews", reviewRoutes);

module.exports = router;
