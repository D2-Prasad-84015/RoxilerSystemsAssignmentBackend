const db = require("../config/db");
const utils = require("../utility/utils");
const crypto = require("crypto-js");

exports.getAllUsers = async (req, res) => {
  const query = "select u.name, u.email , u.address, u.role , avg(r.rating) as rating from user u left join store s on u.userId=s.ownerId left join rating r on s.storeId= r.storeId group by u.name, u.email , u.address, u.role";
  db.query(query, (error, result) => {
    res.send(utils.createResult(error, result));
  });
};

exports.getStoreOwner = async (req, res) => {
  const query = "select userId,name from user where role='store_owner'";
  db.query(query, (error, result) => {
    res.send(utils.createResult(error, result));
  });
};

exports.updatePassword = (req, res) => {
  const { newPassword,currentPassword } = req.body;
  const encryptCurrentPass = String(crypto.SHA1(currentPassword));
  const encryptNewPass = String(crypto.SHA1(newPassword));
  const userId = req.user.id;
  const checkQuery='select * from user where userId=? and password=?';
  const updateQuery = 'update user set password=? where userId=?';
  db.query(checkQuery, [userId,encryptCurrentPass], (error, result) => {
    if(error){
      res.send(utils.createErrorResult(error));
    }
    else if(result.length===0){
      res.send(utils.createErrorResult("Please check current Password"));
    }else{
      
      db.query(updateQuery,[encryptNewPass,userId],(updateErr,updateResult)=>{
        if(error){
          res.send(utils.createErrorResult(updateErr));
        }
        res.send(utils.createSuccessResult(updateResult));
      }

      )
    }
  });
};




