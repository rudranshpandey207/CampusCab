const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },
  seatsAvailable: { type: Number, required: true },
  genderPreference: { type: String, enum: ['Any', 'Male', 'Female'], default: 'Any' },
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  price: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
