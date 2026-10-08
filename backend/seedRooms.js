require("dotenv").config();

const mongoose = require("mongoose");
const Room = require("./models/Room");

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined.");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI);

const rooms = [
  { roomType: "Single", price: 1000, image: "", description: "Single room" },
  { roomType: "Double", price: 2000, image: "", description: "Double room" },
  { roomType: "King", price: 3000, image: "", description: "King room" },
  { roomType: "Queen", price: 4000, image: "", description: "Queen room" }
];

async function seed() {
  await Room.deleteMany({});
  await Room.insertMany(rooms);
  console.log("Rooms inserted");
  process.exit();
}

seed();