const User = require("../model/user/model-user");
const { tryCatch } = require("../utils/tryCatch");

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
exports.register = tryCatch(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //Check if user exist  //
  const isExist = await User.findOne({ email });
  if (isExist) {
    throw new Error("User Already Exist");
  }

  const newUser = await User.create({ firstName, lastName, email, password });
  return res.status(201).json({
    isSuccess: true,
    data: newUser,
  });
});

//  Login
exports.login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please Provide an email or password");
  }

  const userFound = await User.findOne({ email }).select("+password");

  if (!userFound) {
    return res.json({
      message: "Wrong Login Credentials",
    });
  }
  const isMatchPassword = await userFound.comparePassword(password);
  if (!isMatchPassword) {
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
});
