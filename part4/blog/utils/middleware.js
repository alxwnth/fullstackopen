const jwt = require("jsonwebtoken");
const User = require("../models/user");

const tokenExtractor = (request, _, next) => {
  const authorization = request.get("authorization");
  let token;
  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.replace("Bearer ", "");
  } else {
    token = null;
  }
  request.token = token;
  next();
};

const userExtractor = async (request, _, next) => {
  request.user = await User.findById(
    jwt.verify(request.token, process.env.SECRET).id
  );
  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
