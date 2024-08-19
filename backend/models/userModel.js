const mongoose=require('mongoose')
const userSchema=require('../Schemas/userSchema')
const User=mongoose.model("users",userSchema)
module.exports=User;