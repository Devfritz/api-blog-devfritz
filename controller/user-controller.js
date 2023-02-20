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

exports.photoProfile = tryCatch(async (req, res, next) => {
  //  GET USer
  const userToUploadPhoto = await User.findById(req.userAuth);

  if (!userToUploadPhoto) {
    throw new Error("USer Not Found");
  }

  if (req.file) {
    //  update photo
    await User.findByIdAndUpdate(
      req.userAuth,
      {
        $set: {
          profilePhoto: req.file.path,
        },
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      status: "success",
      data: "profile photo upload",
    });
  }
});

exports.wooViewMyProfile = tryCatch(async (req, res, next) => {
  //  Get the user
  const user = await User.findById(req.params.id);
  // GET THE VIEWER
  const viewer = await User.findById(req.userAuth);

  if (user && viewer) {
    //   Verify if this viewer  has visited this profile
    const alreadyView = user.viewers.find(
      (view) => view.toString() === viewer._id.toJSON()
    );
    if (alreadyView) {
      throw new Error("viewer already exist");
    } else {
      user.viewers.push(viewer._id);
      await user.save();

      res.json({
        isSuccess: true,
        data: "You have successfully viewed this profile",
      });
    }
  }
});
