const mongoose=require("mongoose");

mongoose.connect('mongodb+srv://lmahajan2023:lmahajan2027@cluster0.rhgnfl6.mongodb.net/').then(
    ()=>console.log("MongoDB connection successfull")
).catch(error=>console.log(`Error Occured: ${error}`));
  