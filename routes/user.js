const express=require('express');
const { getAllUsers, updatePassword } = require('../controllers/userController');

const router=express.Router();

router.get('/get',getAllUsers);
router.post('/password/update',updatePassword);



module.exports=router;