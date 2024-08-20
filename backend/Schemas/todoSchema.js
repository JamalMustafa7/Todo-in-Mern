const mongoose=require('mongoose')
const todoSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        status:{type:String,required:true},
        expiryDate:{type:String,required:true},
        userId:{type:mongoose.Schema.Types.ObjectId,required:true}
    }
)
module.exports=todoSchema