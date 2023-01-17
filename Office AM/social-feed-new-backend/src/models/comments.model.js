const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repliesSchema = new mongoose.Schema(
  {
    replyText: String,
    _user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    replyToReplies: [
      {
        replyText: String,
        _user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);
const commentsSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
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
    replies: [repliesSchema],
    _user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", commentsSchema);
