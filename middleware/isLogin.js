const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

exports.isLogin = (req, res, next) => {
  //  Get Token
  const token = getTokenFromHeader(req, res);

  //  Verify Token
  const decodedUser = verifyToken(token);

  //   If Not valid
  if (!decodedUser) {
    return res.status(401).json({
      message: "Expired/Invalid Token , Please Login Again",
    });
  } else {
    req.userAuth = decodedUser.id;
    next();
  }
};
