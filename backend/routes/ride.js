const express = require('express');
const router = express.Router();
const Ride = require('../models/ride');
const User = require('../models/User');
const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },
  seatsAvailable: { type: Number, required: true },
  genderPreference: { type: String, default: "Any" },
  price: { type: Number, required: true },
  passengers: { type: [String], default: [] },
});

module.exports = mongoose.model("Ride", rideSchema);

// Create a new ride
router.post('/create', async (req, res) => {
  try {
    const { driverId, from, to, date, seatsAvailable, genderPreference, price } = req.body;

    const ride = new Ride({
      driver: driverId,
      from,
      to,
      date,
      seatsAvailable,
      genderPreference,
      price
    });

    await ride.save();
    res.status(201).json({ msg: 'Ride created', ride });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Join a ride
router.post('/join/:rideId', async (req, res) => {
  const { userId } = req.body;
  const { rideId } = req.params;

  try {
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ msg: 'Ride not found' });

    if (ride.passengers.includes(userId)) return res.status(400).json({ msg: 'Already joined' });

    if (ride.seatsAvailable <= 0) return res.status(400).json({ msg: 'No seats left' });

    ride.passengers.push(userId);
    ride.seatsAvailable -= 1;
    await ride.save();

    res.status(200).json({ msg: 'Joined ride', ride });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
