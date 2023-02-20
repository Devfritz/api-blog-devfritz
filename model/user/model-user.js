const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userShema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstname is required"],
    },
    lastName: {
      type: String,
      required: [true, "lastname is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    profilePhoto: {
      type: String,
    },
    postCount: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Editor", "Guest"],
    },
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    plan: [
      {
        type: String,
        enum: ["free", "premium", "pro"],
        default: "free",
      },
    ],
    userAward: [
      {
        type: String,
        enum: ["Bronze", "Silver", "Gold"],
        default: "Bronze",
      },
    ],
  },
  { timestamps: true }
);

//  Hash Password
userShema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

//  Methods compre password
userShema.methods.comparePassword = function (passwordUser) {
  return bcrypt.compareSync(passwordUser, this.password);
};

//  generate Token
userShema.methods.generateToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
module.exports = mongoose.model("User", userShema);
