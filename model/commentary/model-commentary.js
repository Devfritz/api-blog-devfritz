const mongoose = require("mongoose");

const commentaryShema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
      required: [true, "title is required"],
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Commentary", commentaryShema);
