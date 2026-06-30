const mongoose=require("mongoose");

exports.dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    }catch(error){
        console.log(error);
    }
}