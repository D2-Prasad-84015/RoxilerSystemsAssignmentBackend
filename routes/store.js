const express=require('express');
const { getAllStores, addStore, submitRating, getRatingByStores } = require('../controllers/storeController');
const verifyToken = require('../middleware/verifyToken');
const router=express.Router();

router.get('/get',getAllStores);
router.post('/add',addStore);
router.post('/rating',verifyToken(["user"]),submitRating);
router.get('/rating/get/:storeId',getRatingByStores);


module.exports=router;