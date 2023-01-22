const getTokenFromHeader = (req, res) => {
  let authorization = req.headers.authorization;

  if (authorization && authorization.startsWith("Bearer")) {
    //  Extract Token
    const token = authorization.split(" ")[1];

    if (token !== undefined) {
      return token;
    } else {
      return res.status(401).json({
        status: "is Failed",
        message: "Token is Invalid",
      });
    }
  }
};

module.exports = getTokenFromHeader;
