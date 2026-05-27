const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);

    await booking.save();

    res.status(201).json({
      message: "Booking Successful",
      booking
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};