const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const rideRoutes = require('./routes/ride');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/ride', rideRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
