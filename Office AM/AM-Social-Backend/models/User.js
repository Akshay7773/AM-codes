const mongoose = require("mongoose");

// const mobileSchema = new mongoose.Schema({
//   country_code: String,
//   mobile_number: Number,
// });

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    userName: {
      type: String,
    },
    image: {
      type: String,
    },
    bio: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
    },
    mobile: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("social_feed_users", userSchema);
