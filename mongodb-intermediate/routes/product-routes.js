
const express=require("express");

const {insertSampleProducts,getProductStats}=require("../controllers/product-controller")

const router=express.Router();

router.post("/add/",insertSampleProducts)
router.get("/stats",getProductStats)

module.exports=router;