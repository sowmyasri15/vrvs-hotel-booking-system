const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  username: { type: String, required: true },
  roomType: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },

  guests: { type: Number, default: 1 },

  // ✅ FIX ADDED
  totalAmount: { type: Number, default: 0 },

  paymentStatus: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Booking", bookingSchema);