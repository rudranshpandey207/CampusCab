

// 1. Create a Ride
const Ride = require("../models/ride");

const createRide = async (req, res) => {
  try {
    const { driverId, from, to, date, seatsAvailable, price } = req.body;

    // Validate required fields
    if (!driverId || !from || !to || !date || !seatsAvailable || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newRide = new Ride({
      driverId,
      from,
      to,
      date,
      seatsAvailable,
      price,
    });

    await newRide.save();
    res.status(201).json({ msg: "Ride created successfully!", ride: newRide });
  } catch (error) {
    console.error("Error creating ride:", error);
    res.status(500).json({ error: "Failed to create ride" });
  }
};



// 2. Get Available Rides (less than 4 passengers)
const getAvailableRides = async (req, res) => {
    try {
      // Fetch rides with available seats
      const rides = await Ride.find({ seatsAvailable: { $gt: 0 } });
  
      // Filter rides with less than 4 passengers (if needed)
      const available = rides.filter((ride) => ride.passengers.length < 4);
  
      res.status(200).json({ success: true, rides: available });
    } catch (error) {
      console.error("Error fetching available rides:", error);
      res.status(500).json({ success: false, message: "Error fetching rides" });
    }
  };

// 3. Join a Ride
const joinRide = async (req, res) => {
  try {
    const rideId = req.params.id;
    const { userId } = req.body;

    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res
        .status(404)
        .json({ success: false, message: "Ride not found" });
    }

    if (ride.passengers.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "User already in ride" });
    }

    if (ride.passengers.length >= 4) {
      return res.status(400).json({ success: false, message: "Ride is full" });
    }

    ride.passengers.push(userId);
    await ride.save();

    res.status(200).json({ success: true, ride });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not join ride" });
  }
};

module.exports = {
  createRide,
  getAvailableRides,
  joinRide,
};
