const mongoose=require("mongoose")
const todoSchema=require("../Schemas/todoSchema")
const todoModel=mongoose.model("todo",todoSchema)
module.exports=todoModel;
