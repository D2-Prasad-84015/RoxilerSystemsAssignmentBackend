const express=require('express');
const { getAllUsers, updatePassword, getStoreOwner } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

const router=express.Router();

router.get('/get',verifyToken(["admin"]),getAllUsers);
router.get('/get/owner',verifyToken(["admin"]),getStoreOwner)
router.post('/password/update',verifyToken(["user","store_owner"]),updatePassword);



module.exports=router;