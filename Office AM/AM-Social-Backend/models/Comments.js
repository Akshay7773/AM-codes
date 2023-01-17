const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new mongoose.Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "social_feed_posts",
    },
    text: {
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

module.exports = mongoose.model("social_feed_comments", commentsSchema);
