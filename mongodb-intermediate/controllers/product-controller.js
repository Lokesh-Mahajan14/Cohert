const Product=require("../models/Product");


const getProductStats=async(req,res)=>{
    try{

        const result= await Product.aggregate([
                {
                    $match:{
                        inStock:true,
                        price:{
                            $gte:100
                        }
                    }
                },
                //stage 2
                {
                    $group:{
                        _id:"$category",
                        avgPrice:{
                            $avg:"$price",

                        },
                        count:{
                            $sum:1,
                        },
                    },

                },
             ]

        )
        res.status(201).json({
            sucess:true,
            data:result
        })



    }catch(e){
        console.log(e);
        res.status(500).json({
            sucess:false,
            message:"Something went wrong"
        });

    }
}


const insertSampleProducts=async(req,res)=>{
    try{
        const sampleProducts = [
      {
        name: "Laptop",
        category: "Electronics",
        price: 999,
        inStock: true,
        tags: ["computer", "tech"],
      },
      {
        name: "Smartphone",
        category: "Electronics",
        price: 699,
        inStock: true,
        tags: ["mobile", "tech"],
      },
      {
        name: "Headphones",
        category: "Electronics",
        price: 199,
        inStock: false,
        tags: ["audio", "tech"],
      },
      {
        name: "Running Shoes",
        category: "Sports",
        price: 89,
        inStock: true,
        tags: ["footwear", "running"],
      },
      {
        name: "Novel",
        category: "Books",
        price: 15,
        inStock: true,
        tags: ["fiction", "bestseller"],
      },
    ];
    
    const result=await Product.insertMany(sampleProducts);
    res.status(201).json({
        sucess:true,
        data:`Inserted ${result.length} sample products`,
        
    })

    }catch(e){
        console.log(e);
        res.status(500).json({
            sucess:false,
            message:"Something went wrong"
        });

    }
}

module.exports={insertSampleProducts ,getProductStats};