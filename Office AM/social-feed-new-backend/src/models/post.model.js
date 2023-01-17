const mongoose = require("mongoose");
const { paginate } = require("./plugins");
const postSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
      },
    ],
    caption: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
    },
    likes: [
      {
        type: String,
      },
    ],
    _user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

postSchema.plugin(paginate);

module.exports = mongoose.model("posts", postSchema);
