const mongoose = require("mongoose");

const categoryShema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "title is required"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Category", categoryShema);
