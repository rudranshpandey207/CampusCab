const express = require('express');
const router = express.Router();
const Ride = require('../models/ride');
const User = require('../models/User');

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
