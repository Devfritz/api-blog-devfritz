const { Router } = require("express");
const multer = require("multer");
const storage = require("../config/cloudinary");
const {
  getUsers,
  register,
  login,
  getUser,
  photoProfile,
  wooViewMyProfile,
} = require("../controller/user-controller");
const { isLogin } = require("../middleware/isLogin");

const userRouter = Router();

const upload = multer({ storage });

userRouter.route("/users").get(getUsers).post(register);

userRouter.post("/user/login", login);
userRouter.get("/user/profile/", isLogin, getUser);
userRouter.post(
  "/photo-profile",
  isLogin,
  upload.single("profile"),
  photoProfile
);

userRouter.get("/viewer/user/:id", isLogin, wooViewMyProfile);
module.exports = userRouter;
