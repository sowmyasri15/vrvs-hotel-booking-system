const mongoose = require("mongoose");

const paymentSchema =
new mongoose.Schema({

  username: {

    type: String,

    required: true

  },

  roomType: {

    type: String,

    required: true

  },

  checkIn: {

    type: String,

    required: true

  },

  checkOut: {

    type: String,

    required: true

  },

  cardName: {

    type: String,

    required: true

  },

  cardNumber: {

    type: String,

    required: true

  },

  amount: {

    type: Number,

    required: true

  },

  status: {

    type: String,

    default: "Paid"

  }

});

module.exports =
mongoose.model(
  "Payment",
  paymentSchema
);