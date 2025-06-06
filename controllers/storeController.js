const db = require("../config/db");
const utils = require("../utility/utils");

exports.getAllStores = async (req, res) => {
  const query =
    "select  store.storeId,store.name,store.email,store.address,avg(rating.rating) as rating from store left join rating on store.storeId=rating.storeId group by store.storeId";
  db.query(query, (error, result) => {
    res.send(utils.createResult(error, result));
  });
};

exports.addStore = async (req, res) => {
  const { name, email, address } = req.body;
  const query = "Insert into store (name,email,address) values (?,?,?)";
  db.query(query, [name, email, address], (error, result) => {
    res.send(utils.createResult(error, result));
  });
};

exports.getAllRating = async (req, res) => {
  const query = "select * from rating ";
  db.query(query, (error, result) => {
    res.send(utils.createResult(error, result));
  });
};


exports.getRatingByStores = async (req, res) => {
  const {storeId}=req.params;
  const query = "select u.name,r.rating from rating r join user u on u.userId=r.userId where r.storeId=?";
  db.query(query,[storeId] ,(error, result) => {
    res.send(utils.createResult(error, result));
  });
};


exports.submitRating = async (req, res) => {
  const {storeId,rating}=req.body;
  
  const [existing]=db.query("select * from rating where userId=? and storeId=?",[req.user.id,storeId]);
  if(existing.length>0){
    console.log("existing")
  }else{
    console.log("new");
    
  }
  // const query = "select * from rating ";
  // db.query(query, (error, result) => {
  //   res.send(utils.createResult(error, result));
  // });
};

