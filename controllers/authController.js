const jwt = require("jsonwebtoken");
const db = require("../config/db");
const utils = require("../utility/utils");
const secretekey = require("../config/key");
const crypto = require("crypto-js");

exports.signup = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  const userRole = role ?? "user";
  const encryptPass = String(crypto.SHA1(password));
  const query =
    "Insert into user (name,email,password,address,role) values(?,?,?,?,?)";
  db.query(
    query,
    [name, email, encryptPass, address, userRole],
    (error, result) => {
      res.send(utils.createResult(error, result));
    }
  );
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const encryptPass = String(crypto.SHA1(password));
  const query = "Select * from user where email=? and password=?";
  db.query(query, [email, encryptPass], (error, result) => {
    if (error) {
      res.send(utils.createErrorResult(error));
    } else if (result.length === 0) {
      res.send(utils.createErrorResult("User not found"));
    } else {
      const user = result[0];
      const token = jwt.sign(
        { id: user.userId, role: user.role },
        secretekey.access_key,
        {
          expiresIn: "1h",
        }
      );
      res.send(utils.createSuccessResult(token));
    }
  });
};
