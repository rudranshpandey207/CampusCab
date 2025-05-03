const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  driverId: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },
  seatsAvailable: { type: Number, required: true },
  genderPreference: { type: String, default: "Any" },
  price: { type: Number, required: true },
  passengers: { type: [String], default: [] },
});

module.exports = mongoose.model("Ride", rideSchema);
