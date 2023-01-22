const mongoose = require("mongoose");

const postShema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },

    photo: {
      type: String,
      required: [true, "photo is required"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    numViews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Post", postShema);
