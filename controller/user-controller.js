const User = require("../model/user/model-user");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");
exports.getUsers = (req, res) => {
  return res.status(200).json({
    isSuccess: true,
    data: "users",
  });
};

exports.getUser = async (req, res) => {
  try {
    const specificUser = await User.findById({ _id: req.userAuth });

    return res.status(200).json({
      isSuccess: true,
      data: specificUser,
    });
  } catch (error) {}
};

//  Register
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //Check if user exist  //
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(401).json({
        isSuccess: false,
        message: "User Already Exist",
      });
    }

    const newUser = await User.create({ firstName, lastName, email, password });
    return res.status(201).json({
      isSuccess: true,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

//  Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        message: "All Fields are required",
      });
    }

    const userFound = await User.findOne({ email }).select("+password");

    console.log(userFound);

    const isMatchPassword = await userFound.comparePassword(password);
    if (!userFound || !isMatchPassword) {
      return res.json({
        message: "Wrong Login Credentials",
      });
    }

    if (userFound) {
      const token = userFound.generateToken(userFound._id);
      return res.status(200).json({
        isSuccess: true,
        message: "Connected Successfully",
        data: userFound,
        token,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
