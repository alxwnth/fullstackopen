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
  if (request.token) {
    const userId = jwt.verify(request.token, process.env.SECRET).id;
    const user = await User.findById(userId);
    request.user = user;
  }
  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
