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

module.exports = {
  tokenExtractor,
};
