const app=require("./src/app");
const connectDb=require("./src/database/db")
require("dotenv").config()
connectDb();
app.listen(3000,()=>{
    console.log("server is running at port 3000")
})