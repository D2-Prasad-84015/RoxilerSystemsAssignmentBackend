const express=require('express');
const { getAllRating, submitRating, getRatingByStores, getRatingByUser } = require('../controllers/ratingController');
const verifyToken = require('../middleware/verifyToken');


const router=express.Router();

router.get('/get',getAllRating);
router.post('/submit',verifyToken(["user"]),submitRating);
router.get('/get/:storeId',getRatingByStores);
router.get('/user',verifyToken(["store_owner"]),getRatingByUser);

module.exports=router;