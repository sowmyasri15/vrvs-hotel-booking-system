const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

exports.makePayment = async (req, res) => {
  try {
    // 1. SAVE PAYMENT
    const payment = new Payment(req.body);
    await payment.save();

    // 2. UPDATE BOOKING STATUS
    await Booking.updateOne(
      {
        username: req.body.username,
        roomType: req.body.roomType,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut
      },
      {
        $set: { paymentStatus: "Paid" }
      }
    );

    res.status(201).json({
      success: true,
      message: "Payment Successful",
      payment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};