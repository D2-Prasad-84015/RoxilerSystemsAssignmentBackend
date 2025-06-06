const db = require("../config/db");
const utils = require("../utility/utils");

exports.getAllStores = async (req, res) => {
  const query =
    "select  store.storeId,store.name,store.email,store.address,store.ownerId, avg(rating.rating) as rating from store left join rating on store.storeId=rating.storeId group by store.storeId";
  db.query(query, (error, result) => {
    res.send(utils.createResult(error, result));
  });
};

exports.addStore = async (req, res) => {
  const { name, email, address,ownerId } = req.body;
  const query = "Insert into store (name,email,address,ownerId) values (?,?,?,?)";
  db.query(query, [name, email, address,ownerId], (error, result) => {
    res.send(utils.createResult(error, result));
  });
};


