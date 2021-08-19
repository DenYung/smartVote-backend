const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //check if bearer token is available
  const bearer = req.headers["authorization"];
  if (!bearer) return res.status(403).send("token not available");

  if (!bearer.startsWith("Bearer "))
    return res.status(400).send("invalid token format");

  //extract token
  const token = bearer.substring(7, bearer.length);
  const decoded = jwt.verify(token, "secret12345yykjwt");

  if (!decoded) return res.status(400).send("invalid token");
  req.user = decoded;
  next();
};

const verifyAdminRole = (req, res, next) => {
  const isAdmin = req.user.isAdmin;
  if (!isAdmin) res.status(403).send("not authorized");
  next();
};

module.exports = {
  verifyToken,
  verifyAdminRole,
};
