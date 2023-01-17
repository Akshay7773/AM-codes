const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    caption: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    likes: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("social_feed_posts", postSchema);
