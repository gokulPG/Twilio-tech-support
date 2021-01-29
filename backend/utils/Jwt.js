const jwt = require("jsonwebtoken");

function createJwt(username, secretKey) {
  const token = jwt.sign({ username }, secretKey);
  return token;
}

function verifyToken(token, secretKey) {
  const data = jwt.verify(token, secretKey);
  return data;
}

module.exports = {
  createJwt,
  verifyToken,
};
