const jwt = require("jsonwebtoken");
const secretekey = require("../config/key");



const verifyToken = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers["x-token"];
    console.log(token);
    if (!token) {
      return res.status(401).send({ error: "Access token missing" });
    }

    try {
      const decoded = jwt.verify(token, secretekey.access_key);
      console.log(decoded)
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).send({ error: "Access denied" });
      }

      next();
    } catch (err) {
      return res.status(401).send({ error: "Invalid or expired access token" });
    }
  };
};

module.exports = verifyToken;