const express=require('express');
const { getAllStores, addStore } = require('../controllers/storeController');
const verifyToken = require('../middleware/verifyToken');
const router=express.Router();

router.get('/get',getAllStores);
router.post('/add',verifyToken(["admin"]),addStore);

module.exports=router;