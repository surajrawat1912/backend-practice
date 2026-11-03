const mongoose=require("mongoose");
async function connectDb(){
    try{
        await mongoose.connect(process.env.URI);
        console.log("connected to db")
    }catch(err){
        console.log(err);
    }
}
module.exports=connectDb;