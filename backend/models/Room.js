const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({

  roomType:{
    type:String,
    required:true
  },

  price:{
    type:Number,
    required:true
  },

  image:{
    type:String
  },

  description:{
    type:String
  }

});

module.exports =
mongoose.model("Room", roomSchema);