const db = require("../config/db");
const utils = require("../utility/utils");
const crypto = require("crypto-js");

exports.getAllUsers = async (req, res) => {
  const query = "select u.name, u.email , u.address, u.role , avg(r.rating) as rating from user u left join store s on u.userId=s.ownerId left join rating r on s.storeId= r.storeId group by u.name, u.email , u.address, u.role";
  db.query(query, (error, result) => {
    res.send(utils.createResult(error, result));
  });
};


exports.updatePassword = (req, res) => {
  const { newPassword } = req.body;
  const encryptPass = String(crypto.SHA1(newPassword));
  const userId = req.user.id;
  const query = 'update user set password=? where userId=?';
  db.query(query, [encryptPass, userId], (error, result) => {
    res.send(utils.createResult(error, result));
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//normal user queries=>

exports.submitRating = (req, res) => {
  const { storeId, rating } = req.body;
  const userId = req.user.id;
  const query = 'Insert into rating (userId, storeId, rating) values (?, ?, ?)';
  db.query(query, [userId, storeId, rating], (error, result) => {
    res.send(utils.createResult(error, result));
  });
};

exports.updateRating = (req, res) => {
  const { storeId, rating } = req.body;
  const userId = req.user.id;
  const query = 'Update rating Set rating = ? where userId = ? and storeId = ?';
  db.query(query, [rating, userId, storeId], (error, result) => {
    res.send(utils.createResult(error, result));
  });
};



