const mongoose = require("mongoose");
const User = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 15,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 100,
  },
  contact: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    max: 8,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", User);
