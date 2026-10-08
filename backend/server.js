require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");

const User = require("./models/User");
const Room = require("./models/Room");
const Booking = require("./models/Booking");
const Payment = require("./models/Payment");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

/* MIDDLEWARE */
app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "VRVS Hotel Booking API is running"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok"
  });
});

/* DATABASE CONNECTION */
const startServer = async () => {
  try {
    await connectDB();

    const count = await Room.countDocuments();

    if (count === 0) {
      await Room.insertMany([
        {
          roomType: "Single",
          price: 1000,
          image: "single.jpg",
          description: "Single bed room"
        },
        {
          roomType: "Double",
          price: 2000,
          image: "double.jpg",
          description: "Double bed room"
        },
        {
          roomType: "King",
          price: 3000,
          image: "king.jpg",
          description: "King size luxury room"
        },
        {
          roomType: "Queen",
          price: 4000,
          image: "queen.jpg",
          description: "Queen size premium room"
        }
      ]);

      console.log("Rooms Seeded Successfully");
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server startup failed:", err.message);
    process.exit(1);
  }
};

startServer();

/* REGISTER */
app.post("/register", async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Registered Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Registration Failed"
    });
  }
});

/* LOGIN */
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username: username?.trim()
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Username"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password"
      });
    }

    res.json({
      success: true,
      message: "Login Successful",
      user
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Login Failed"
    });
  }
});

/* GET ROOMS */
app.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to Fetch Rooms"
    });
  }
});

/* BOOK ROOM */
app.post("/book-room", async (req, res) => {
  try {
    const booking = new Booking(req.body);

    await booking.save();

    res.json({
      success: true,
      message: "Room Booked Successfully",
      booking
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Booking Failed"
    });
  }
});

/* PAYMENT */
app.post("/payment", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();

    await Booking.findOneAndUpdate(
      {
        username: req.body.username,
        roomType: req.body.roomType,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut
      },
      { paymentStatus: "Paid" }
    );

    res.json({
      success: true,
      message: "Payment Successful"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Payment Failed"
    });
  }
});

/* GET BOOKINGS */
app.get("/my-bookings/:username", async (req, res) => {
  try {
    const bookings = await Booking.find({
      username: req.params.username
    });

    res.json(bookings);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to Fetch Bookings"
    });
  }
});

/* CANCEL BOOKING */
app.delete("/cancel-booking/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Booking Cancelled"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cancellation Failed"
    });
  }
});

