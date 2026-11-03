const userModel = require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
require("dotenv").config();
async function registerUser(req, res) {
    const { username, email, password, role } = req.body;
    try {
        const isUserAlready = await userModel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })

        if(isUserAlready){
            return res.status(409).json({
                message:"user already exist"
            })
        }
        const hash=await bcrypt.hash(password,10)

        const user=await userModel.create({
            username,
            email,
            password:hash,
            role,
        })
        const token=jwt.sign({id:user._id,role:user.role},process.env.JWT);
        res.cookie("token",token);

        return res.status(201).json({
            message:"user created successfully",
            user,
        })


    }catch(err){
        console.log(err);
    }
}

module.exports={registerUser}