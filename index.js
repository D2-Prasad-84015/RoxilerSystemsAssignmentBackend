const express=require('express');
const cors=require('cors');
const router=express.Router();
const app = express();
app.use(express.json());
app.use(cors('*'));


const authRoutes=require('./routes/auth');
app.use('/auth',authRoutes);

const storeRoutes=require('./routes/store');
app.use('/store',storeRoutes);

const userRoutes=require('./routes/user');
app.use('/user',userRoutes);


const port=process.env.port||4000;
app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
})
