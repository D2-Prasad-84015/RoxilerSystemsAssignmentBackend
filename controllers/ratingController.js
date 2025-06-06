const db = require("../config/db");
const utils = require("../utility/utils");

exports.getAllRating = async (req, res) => {
  const query = "select * from rating ";
  db.query(query, (error, result) => {
    res.send(utils.createResult(error, result));
  });
};

exports.submitRating = async (req, res) => {
  const { storeId, rating } = req.body;
  db.query(
    "select * from rating where userId=? and storeId=?",
    [req.user.id, storeId],
    (error, result) => {
      if (error) {
        res.send(utils.createErrorResult(error));
      }
      if (result.length > 0) {
        db.query(
          "update rating set rating=? where userId=? and storeId=?",
          [rating, req.user.id, storeId],
          (updateerror, updateresult) => {
            if (updateerror) {
              res.send(utils.createErrorResult(updateerror));
            }
            res.send(utils.createSuccessResult(updateresult));
          }
        );
      } else {
        db.query(
          "insert into rating(userId,storeId,rating) values(?,?,?)",
          [req.user.id, storeId, rating],
          (insertErr, insertresult) => {
            if (insertErr) {
              res.send(utils.createErrorResult(insertErr));
            }
            res.send(utils.createSuccessResult(insertresult));
          }
        );
      }
    }
  );
};

exports.getRatingByStores = async (req, res) => {
  const { storeId } = req.params;
  const query =
    "select u.userId, u.name,r.rating from rating r join user u on u.userId=r.userId where r.storeId=?";
  db.query(query, [storeId], (error, result) => {
    res.send(utils.createResult(error, result));
  });
};

exports.getRatingByUser = async (req, res) => {
  const query =
    "SELECT ru.userId,ru.name,s.storeId,s.name AS storeName ,r.rating FROM store s JOIN  user u ON s.ownerId = u.userId JOIN rating r ON r.storeId = s.storeId JOIN user ru ON r.userId = ru.userId WHERE s.ownerId= ? and r.rating IS NOT NULL;  ";
  db.query(query, [req.user.id], (error, result) => {
    console.log(result);
    res.send(utils.createResult(error, result));
  }); 
};
