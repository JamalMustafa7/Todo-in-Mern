const express=require('express')
const mongoose=require('mongoose')
const User=require('./models/userModel')
const bcrypt=require("bcrypt");
const cors=require('cors')
const port=process.env.PORT || 4000
const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://jamal:123@cluster0.uvdji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    function ()
    {
        console.log("Connected to database")
        app.listen(port,()=>
            {
                console.log("Server is listening")
            })
    }
).catch(err=>
{
    console.log("error occured")
    console.log(err)
}
)
app.post("/signup",async (req,res)=>
{
    const hash=await bcrypt.hash(req.body.password,10)
    const u=new User({name:req.body.name,email:req.body.email,password:hash})
    try{
        await u.save()
        res.status(200).send(u._id)
    }
    catch(err)
    {
        res.status(400).send(err)        
    }
})
app.get('/',(req,res)=>
{
    res.status(200).send("Hello World")
})
