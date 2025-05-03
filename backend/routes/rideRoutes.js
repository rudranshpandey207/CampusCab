const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ridecontroller");

// Routes
router.get("/available", rideController.getAvailableRides);
router.post("/create", rideController.createRide);
router.post("/join/:id", rideController.joinRide);

module.exports = router;
