const { Router } = require("express");
const {
  getUsers,
  register,
  login,
  getUser,
} = require("../controller/user-controller");
const { isLogin } = require("../middleware/isLogin");

const userRouter = Router();

userRouter.route("/users").get(getUsers).post(register);

userRouter.post("/user/login", login);
userRouter.get("/user/profile/", isLogin, getUser);

module.exports = userRouter;
