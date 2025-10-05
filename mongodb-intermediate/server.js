const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config();
const produtRoutes=require("./routes/product-routes")


const app=express();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('mongodb connected sucessufully'))
.catch((error)=> console.log(error));

app.use(express.json());
app.use("/products",produtRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`server is now running on the port ${process.env.PORT}`)
})


